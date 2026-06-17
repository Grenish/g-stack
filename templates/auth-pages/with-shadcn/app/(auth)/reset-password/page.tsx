import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-md min-h-dvh mx-auto flex items-center justify-center">
        <form className="w-full">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Acme</FieldLegend>
              <FieldDescription>Reset your password.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="password"
                      placeholder="New Password"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field orientation={"horizontal"}>
                  <Button size={"sm"}>Reset Password</Button>
                  <Link href={"/signin"}>
                    <Button size={"sm"} variant={"outline"}>
                      Back to Sign In
                    </Button>
                  </Link>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
