import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `enquiries` table
export interface EnquiryRecord {
    id: string;
    name: string;
    email: string;
    phone: string;
    pincode: string;
    state: string;
    enquiryType: string; // product | service | general
    message: string | null;
    productId: string | null;
    serviceId: string | null;
    status: string; // pending | contacted | resolved | closed
    createdAt: Date;
}

export interface EnquiryFilters {
    state?: string;
    pincode?: string;
    status?: string;
    enquiryType?: string;
    page?: number;
    limit?: number;
}

export function createEnquiry(data: Prisma.EnquiryCreateInput) {
    return prisma.enquiry.create({ data });
}

export async function findAllEnquiries(filters: EnquiryFilters = {}) {
    const { state, pincode, status, enquiryType, page = 1, limit = 20 } = filters;

    const where: Prisma.EnquiryWhereInput = {};
    if (state) where.state = state;
    if (pincode) where.pincode = pincode;
    if (status) where.status = status;
    if (enquiryType) where.enquiryType = enquiryType;

    const skip = (page - 1) * limit;

    const [enquiries, total] = await Promise.all([
        prisma.enquiry.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { product: true, service: true },
        }),
        prisma.enquiry.count({ where }),
    ]);

    return { enquiries, total, page, limit };
}

export function findEnquiryById(id: string) {
    return prisma.enquiry.findUnique({
        where: { id },
        include: { product: true, service: true },
    });
}

export function updateEnquiryStatus(id: string, status: string) {
    return prisma.enquiry.update({ where: { id }, data: { status } });
}

export function deleteEnquiry(id: string) {
    return prisma.enquiry.delete({ where: { id } });
}