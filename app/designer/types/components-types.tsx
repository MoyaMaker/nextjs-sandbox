import { z } from "zod";
import { InputProps } from "../schemas/input-schema";
import { FormProps } from "../schemas/form-schema";
import { ContainerProps } from "../schemas/container-schema";

export type InputPropsTypes = z.infer<typeof InputProps>;
export type FormPropsTypes = z.infer<typeof FormProps>;
export type ContainerPropsType = z.infer<typeof ContainerProps>;
