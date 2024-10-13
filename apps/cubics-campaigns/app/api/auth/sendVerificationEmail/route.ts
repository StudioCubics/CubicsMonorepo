import resend from "@/lib/resend";
export async function POST(req: Request) {
  try {
    const requestedData = (await req.json()) as { to: string; subject: string };
    const { data, error } = await resend.emails.send({
      from: "Cubics Campaigns <support@studiocubics.com>",
      to: requestedData.to,
      subject: requestedData.subject,
      //   react: EmailTemplate({ firstName: "John" }),
      html: `<div>hello</div>`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
