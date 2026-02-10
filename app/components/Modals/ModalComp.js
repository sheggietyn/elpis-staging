"use client";
import { AlertDialog, Inset } from "@radix-ui/themes";
import * as Popover from "@radix-ui/react-popover";

export const PopModal = ({
  BtnClose,
  Open,
  OpenClose,
  Title,
  Description,
  Bottomer,
  Width,
}) => {
  return (
    <AlertDialog.Root
      open={Open}
      onOpenChange={OpenClose}
      className="font-raleway"
    >
      <AlertDialog.Content
        className="md:w-96 w-full font-raleway"
        maxWidth={Width ? Width : "450px"}
      >
        {BtnClose ? BtnClose : null}
        <AlertDialog.Title className="text-center text-md font-raleway">
          {Title ? Title : null}
        </AlertDialog.Title>

        <Inset side="x">
          <div className="px-3">{Description}</div>
        </Inset>

        {Bottomer ? Bottomer : null}
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export const PopperModal = ({
  Openner,
  NavTitle,
  ContentPoper,
  OpennerClose,
  Width,
}) => {
  return (
    <div>
      <PopModal
        Open={Openner}
        Title={NavTitle}
        Description={ContentPoper}
        OpenClose={OpennerClose}
        //Bottomer={BottomBtn}
        Width={Width}
      />
    </div>
  );
};

export const PoperOver = ({ openPop, setOpenPop, Content, btnOpen }) => {
  return (
    <Popover.Root open={openPop} onOpenChange={setOpenPop}>
      <Popover.Trigger asChild>{btnOpen}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={5}
          align="start" // Adjust alignment if needed (e.g., 'center', 'end')
          className="bg-white shadow-md rounded p-4 w-72 z-50"
        >
          <div>{Content}</div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const TextTips = ({ Content }) => {
  return <p className="text-xs text-gray-700">{Content}</p>;
};
