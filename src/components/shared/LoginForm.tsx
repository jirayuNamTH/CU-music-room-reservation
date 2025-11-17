"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    return (
        <div id="login" className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome!</CardTitle>
            <CardDescription>
                Login or Sign up with your Google account
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form>
                <FieldGroup>
                <Field>
                    <Button variant="outline" type="button">
                    <img src="asset/icon/google.svg" alt="Google Logo" className="h-5 w-5 mr-2" />
                    Login or Sign up with Google
                    </Button>
                </Field>
                </FieldGroup>
            </form>
            </CardContent>
        </Card>
        {/* For declare term of service and privacy policy

        <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
        </FieldDescription> 

        */}
        </div>
    )
}
