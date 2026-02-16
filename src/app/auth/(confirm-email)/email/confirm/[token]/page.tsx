import ConfirmEmailPage from "@/features/auth/confirm-email/ConfirmEmailPage";

const page = async ({ params }: { params: { token: string } }) => {
  const { token } = await params;

  return (
    <div>
      <ConfirmEmailPage token={token} />
    </div>
  );
};

export default page;
