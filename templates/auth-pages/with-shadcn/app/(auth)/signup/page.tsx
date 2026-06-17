import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LockKeyhole, Mail, PersonStanding, User2 } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-md mx-auto flex items-center justify-center min-h-dvh">
        <form className="w-full">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Acme</FieldLegend>
              <FieldDescription>Sign up to create an account.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <PersonStanding />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="First Name" required />
                    <InputGroupInput placeholder="Last Name" required />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <FieldDescription>
                    Choose a unique username to identify yourself
                  </FieldDescription>
                  <InputGroup>
                    <InputGroupAddon>
                      <User2 />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Username" required />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <FieldDescription>
                    Choose a strong password to protect your account.
                  </FieldDescription>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field orientation={"horizontal"}>
                  <Button size={"sm"}>Signup</Button>
                  <Link href="/signin">
                    <Button size={"sm"} variant={"outline"}>
                      Have an account?
                    </Button>
                  </Link>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldGroup>
                <Field orientation={"horizontal"}>
                  <FieldLabel>Or continue with</FieldLabel>
                  <Button size={"icon"}>
                    <GoogleLogo />
                  </Button>
                  <Button size={"icon"}>
                    <XLogo />
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

const XLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
    </svg>
  );
};

const GoogleLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
};
