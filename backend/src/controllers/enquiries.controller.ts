import { Request, Response, NextFunction } from 'express';
import * as EnquiryModel from '../models/enquiry.model';
import * as ProductModel from '../models/product.model';
import * as ServiceModel from '../models/service.model';
import { enquirySchema } from '../validation/enquiry.schema';
import { sendEmail } from '../utils/email';
import { enquiryNotificationTemplate } from '../utils/emailTemplates';

// POST /api/enquiries (public - customer submits enquiry)
export async function createEnquiry(req: Request, res: Response, next: NextFunction) {
  try {
    const data = enquirySchema.parse(req.body);

    const enquiry = await EnquiryModel.createEnquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      pincode: data.pincode,
      state: data.state,
      enquiryType: data.enquiryType,
      message: data.message,
      status: 'pending',
      ...(data.productId && { product: { connect: { id: data.productId } } }),
      ...(data.serviceId && { service: { connect: { id: data.serviceId } } }),
    });

    let productName: string | null = null;
    let productSlug: string | null = null;
    let serviceName: string | null = null;
    let serviceSlug: string | null = null;

    if (data.productId) {
      const product = await ProductModel.findProductById(data.productId);
      if (product) {
        productName = product.name;
        productSlug = product.slug;
      }
    }

    if (data.serviceId) {
      const service = await ServiceModel.findServiceById(data.serviceId);
      if (service) {
        serviceName = service.name;
        serviceSlug = service.slug;
      }
    }

    // Fixed, real mailbox that receives every enquiry notification.
    // Must be a working, deliverable address - not a placeholder domain
    // (an address on a domain with no MX record will always soft-bounce).
    const adminEmail = process.env.ADMIN_EMAIL;

    if (adminEmail) {
      const html = enquiryNotificationTemplate({
        id: enquiry.id,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        pincode: enquiry.pincode,
        state: enquiry.state,
        enquiryType: enquiry.enquiryType,
        message: enquiry.message,
        productName,
        productSlug,
        serviceName,
        serviceSlug,
      });

      try {
        await sendEmail({
          to: adminEmail,
          subject: `New Blitz Paints Enquiry - ${enquiry.name}${productName ? ` (${productName})` : serviceName ? ` (${serviceName})` : ''
            }`,
          html,
          // Shows the customer's own name as the sender in the inbox,
          // while the envelope address stays your verified Brevo sender
          // (required for delivery - see utils/email.ts).
          fromName: enquiry.name,
          // Hitting "Reply" in Gmail goes straight to the customer.
          replyTo: enquiry.email,
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. Our team will contact you soon.',
      data: { enquiryId: enquiry.id },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/enquiries (admin listing - guarded by attachUser/requireAuth once Phase 2 login ships)
export async function listEnquiries(req: Request, res: Response, next: NextFunction) {
  try {
    const { state, pincode, status, page = '1', limit = '20' } = req.query;

    const result = await EnquiryModel.findAllEnquiries({
      state: state as string,
      pincode: pincode as string,
      status: status as string,
      page: Number(page),
      limit: Number(limit),
    });

    res.json({
      success: true,
      data: {
        enquiries: result.enquiries,
        pagination: { page: result.page, limit: result.limit, total: result.total },
      },
    });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/enquiries/:id/status (admin - update enquiry status)
export async function updateEnquiryStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'status is required' });
    }
    const enquiry = await EnquiryModel.updateEnquiryStatus(req.params.id, status);
    res.json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
}