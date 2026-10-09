import { Body, Head, Html, Tailwind } from "react-email";

export interface OtpEmailTemplateProps {
  code: string;
}

const OtpEmailTemplate = ({ code }: OtpEmailTemplateProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body>
        <div className="flex h-dvh items-center justify-center">
          <p>Your one time password: {code}</p>
        </div>
      </Body>
    </Tailwind>
  </Html>
);

export default OtpEmailTemplate;
