import { UseToastOptions } from "@chakra-ui/react";

interface ICallToastInputs {
  status: UseToastOptions["status"];
  message: string;
}

export const callToast = (
  toast: any,
  { status, message }: ICallToastInputs
) => {
  toast({
    status,
    title: message,
    position: "top",
    duration: 9000,
    isClosable: true,
  });
};
