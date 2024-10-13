import { Toaster, ToasterProps } from "react-hot-toast";

export default function Toast(props: ToasterProps) {
  const defaultOptions: ToasterProps["toastOptions"] = {
    style: {
      background: "color-mix(in srgb,var(--secondary) 85%, transparent)",
      backdropFilter: "blur(5px)",
      color: "var(--primary-text)",
      fontSize: "var(--fs-p)",
    },
    success: {
      style: {
        background: "color-mix(in srgb,var(--primary) 85%, transparent)",
      },
    },
    error: {
      style: {
        background: "color-mix(in srgb,var(--danger) 85%, transparent)",
      },
      icon: "Error",
    },
    duration: 3000,
  };
  return (
    <Toaster
      toastOptions={defaultOptions}
      position={"bottom-right"}
      {...props}
    />
  );
}
