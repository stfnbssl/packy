export type Register = (
    options: {
      validate: () => Error | null;
      focus: () => void;
    }
  ) => number;
  
export type Unregister = (key: number) => void;
  
export type Update = () => void;
  
export type FormValidation = {
    register: Register;
    unregister: Unregister;
    update: Update;
    valid: boolean;
  };
  