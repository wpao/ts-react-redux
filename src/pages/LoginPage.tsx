import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";

const loginFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(6),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

// memberi type
import { RootState } from "../store/store";
import { GuestPage } from "@/components/guard/GuestPage";

const LoginPage = () => {
  // menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();

  // mengambil satu slice yaitu user
  const userSelector = useSelector((state: RootState) => state.user);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  // handle login
  const handleLogin = async (values: LoginValues) => {
    try {
      // username harus unik dan password harus sesuai
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
          password: values.password,
        },
      });
      // console.log(userResponse.data[0].username);
      // console.log(userResponse.data);
      // console.log(values.username);

      if (!userResponse.data.length) {
        alert("Username or password is incorrect");
        return;
      }

      alert(`Login successful for ${values.username}`);

      console.log("Dispatching USER_LOGIN:", userResponse.data[0]);

      // simpan user id ke local storage
      // ini di pakai untuk melihat user yang login
      localStorage.setItem(
        "current-user",
        // JSON.stringify(userResponse.data[0].id)
        userResponse.data[0].id
      );

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data[0].username,
          id: userResponse.data[0].id,
          role: userResponse.data[0].role,
        },
      });

      form.reset();
    } catch (error) {
      console.log(error);
    }

    // console.log(values)
    // alert(`Username: ${values.username} | Password: ${values.password}`);
  };

  return (
    <GuestPage>
      <main className="flex flex-col justify-center items-center h-[80vh] ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="max-w-md w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back! {userSelector.username}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={isChecked ? "text" : "password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(checked: boolean) =>
                      setIsChecked(checked)
                    }
                  />
                  <Label htmlFor="show-password">Show Password</Label>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button
                    type="submit" /* disabled={!form.formState.isValid} */
                  >
                    Login
                  </Button>
                  <Button variant="link" className="w-full">
                    Sign Up
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default LoginPage;

// types
type LoginValues = {
  username: string;
  password: string;
};
