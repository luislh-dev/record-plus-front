import { ManagementForm } from "./components/ManagementForm";
import { UserManagementCreateValues } from "./models/userManagementCreateSchema";

export const UserAdd = () => {
  return (
    <ManagementForm
      onSubmit={function (data: UserManagementCreateValues): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
