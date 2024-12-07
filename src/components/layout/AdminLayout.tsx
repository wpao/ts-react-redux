import { IoCart, IoPerson, IoPricetag } from "react-icons/io5";
import { Button } from "../ui/button";

type SidebarItem = {
  children: React.ReactNode;
};

const SidebarItem = (props: SidebarItem) => {
  const { children } = props;
  return (
    <Button
      variant="ghost"
      size={"lg"}
      className="w-full rounded-none justify-start"
    >
      {children}
    </Button>
  );
};

type typeAdminLayout = {
  title: string;
  description: string;
  rightSection?: React.ReactNode;
  children: React.ReactNode;
};

export const AdminLayout = (props: typeAdminLayout) => {
  const { title, description, rightSection, children } = props;

  return (
    <div className="flex">
      <aside className="w-72 border-r h-screen">
        <div className="h-16 flex-col flex items-center justify-center border-b">
          <h1 className="text-3xl font-semibold">Admin</h1>
        </div>

        <div className="flex flex-col space-y-0 py-4">
          <SidebarItem>
            <IoPricetag className="w-6 h-6 mr-4" />
            Products Management
          </SidebarItem>
          <SidebarItem>
            <IoCart className="w-6 h-6 mr-4" />
            Products Management
          </SidebarItem>
        </div>
      </aside>

      <div className="flex-1">
        <header className="h-16 border-b w-full flex justify-end items-center px-8">
          <Button className="rounded-full" size={"icon"}>
            <IoPerson className="w-6 h-6" />
          </Button>
        </header>

        <main className="flex flex-col p-4">
          <div className="flex justify-between items-center pb-4 border-b mb-8">
            <div>
              <h1 className="font-bold text-4xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {rightSection}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};
