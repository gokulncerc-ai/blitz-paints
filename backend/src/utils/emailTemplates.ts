export interface EnquiryEmailData {
  id: string;
  name: string;
  email: string;
  phone: string;
  pincode: string;
  state: string;
  enquiryType: string;
  message?: string | null;
  productName?: string | null;
  productSlug?: string | null;
  serviceName?: string | null;
  serviceSlug?: string | null;
}

export function enquiryNotificationTemplate(enquiry: EnquiryEmailData): string {
  const clientUrl = process.env.CLIENT_URL;

  const productRow = enquiry.productName
    ? `
        <tr>
          <td style="border-bottom: 1px solid #eeeeee;"><strong>Product</strong></td>
          <td style="border-bottom: 1px solid #eeeeee;">
            ${enquiry.productName}
            ${enquiry.productSlug
      ? ` (<a href="${clientUrl}/products/${enquiry.productSlug}">view</a>)`
      : ''}
          </td>
        </tr>`
    : '';

  const serviceRow = enquiry.serviceName
    ? `
        <tr>
          <td style="border-bottom: 1px solid #eeeeee;"><strong>Service</strong></td>
          <td style="border-bottom: 1px solid #eeeeee;">
            ${enquiry.serviceName}
            ${enquiry.serviceSlug
      ? ` (<a href="${clientUrl}/services/${enquiry.serviceSlug}">view</a>)`
      : ''}
          </td>
        </tr>`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Blitz Paints Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: Arial, Helvetica, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 15px;">
<tr>
<td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 8px; overflow: hidden;">

<tr>
<td style="padding: 25px; background: #000080; color: #ffffff;">
  <h1 style="margin: 0; font-size: 24px;">Blitz Paints</h1>
  <p style="margin: 8px 0 0; color: #dddddd;">New Customer Enquiry</p>
</td>
</tr>

<tr>
<td style="padding: 30px;">
  <h2 style="margin-top: 0; color: #222222;">New Enquiry Received</h2>
  <p>A new customer enquiry has been submitted through the Blitz Paints website.</p>

  <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="border-bottom: 1px solid #eeeeee;"><strong>Enquiry ID</strong></td>
      <td style="border-bottom: 1px solid #eeeeee;">${enquiry.id}</td>
    </tr>
    <tr>
      <td style="border-bottom: 1px solid #eeeeee;"><strong>Name</strong></td>
      <td style="border-bottom: 1px solid #eeeeee;">${enquiry.name}</td>
    </tr>
    <tr>
      <td style="border-bottom: 1px solid #eeeeee;"><strong>Email</strong></td>
      <td style="border-bottom: 1px solid #eeeeee;">${enquiry.email}</td>
    </tr>
    <tr>
      <td style="border-bottom: 1px solid #eeeeee;"><strong>Phone</strong></td>
      <td style="border-bottom: 1px solid #eeeeee;">${enquiry.phone}</td>
    </tr>
    <tr>
      <td style="border-bottom: 1px solid #eeeeee;"><strong>State</strong></td>
      <td style="border-bottom: 1px solid #eeeeee;">${enquiry.state}</td>
    </tr>
    <tr>
      <td style="border-bottom: 1px solid #eeeeee;"><strong>Pincode</strong></td>
      <td style="border-bottom: 1px solid #eeeeee;">${enquiry.pincode}</td>
    </tr>
    <tr>
      <td style="border-bottom: 1px solid #eeeeee;"><strong>Enquiry Type</strong></td>
      <td style="border-bottom: 1px solid #eeeeee;">${enquiry.enquiryType}</td>
    </tr>
    ${productRow}
    ${serviceRow}
  </table>

  <h3 style="margin-top: 30px;">Customer Message</h3>
  <div style="padding: 15px; background: #f7f7f7; border-radius: 6px; line-height: 1.6;">
    ${enquiry.message || 'No message provided'}
  </div>

  <p style="margin-top: 30px; color: #666666; font-size: 13px;">
    This is an automated notification from the Blitz Paints website.
  </p>
</td>
</tr>

<tr>
<td style="padding: 20px; background: #f7f7f7; text-align: center; color: #777777; font-size: 12px;">
  Blitz Paints
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>
`;
}