import { ResetPasswordForm } from "./_components/ResetPasswordForm";

interface ResetPasswordPageProps {
  token: string;
}
const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ token }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
