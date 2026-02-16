import Link from "next/link";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

const ReusableView = ({ linkHref }: { linkHref: any }) => {
  if (!linkHref) {
    return (
      <Button variant="outline" size="sm">
        <Eye />
      </Button>
    );
  }
  return (
    <Link href={linkHref}>
      <Button variant="outline" size="sm">
        <Eye />
      </Button>
    </Link>
  );
};

export default ReusableView;
