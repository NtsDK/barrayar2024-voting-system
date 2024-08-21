"use client";

import { PencilIcon, PlusIcon, TrashIcon, ClipboardDocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

interface DeleteButtonWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function DeleteButtonWrapper(props: DeleteButtonWrapperProps) {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState("");

  // console.log("isOpen", isOpen);

  return (
    <>
      <button
        className="rounded-md border p-2 hover:bg-gray-100"
        title={title}
        onClick={() => {
          setIsOpen(true);
          setPin(generatePin());
          // console.log("DeleteButtonWrapper");
        }}
      >
        <span className="sr-only">{title}</span>
        <TrashIcon className="w-5" />
      </button>
      <ConfirmationModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} pin={pin}>
        {children}
      </ConfirmationModal>
    </>
  );
}

interface ConfirmationModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  pin: string;
  isOpen: boolean;
}

function ConfirmationModal({ onClose, children, title, isOpen, pin }: ConfirmationModalProps) {
  // const handleCloseClick = (e) => {
  //   e.preventDefault();
  //   onClose();
  // };
  if (!isOpen) {
    return null;
  }

  const [controlPin, setControlPin] = useState("");

  const modalContent = (
    <>
      <div
        className="modal-overlay absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-900 opacity-50"
        onClick={(e) => {
          // console.log("overlay click");
          e.preventDefault();
          onClose();
        }}
      ></div>
      <div
        className="modal absolute top-1/2 left-1/2  bg-white opacity-100 flex flex-col p-4 rounded-lg"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="modal-header flex-0 mb-8">
          <span>{title}</span>
          <button
            className="rounded-md border p-2 hover:bg-gray-100 float-right"
            title={title}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <span className="sr-only">{title}</span>
            <XMarkIcon className="w-5" />
          </button>
        </div>
        <div className="modal-body  flex-1">
          <div className="mb-4">Введите пин {pin}, чтобы разблокировать удаление</div>
          <input className="mb-4" value={controlPin} onChange={(e) => setControlPin(e.target.value)} />
          <div
            className={clsx("flex justify-center", {
              visible: pin === controlPin,
              invisible: pin !== controlPin,
            })}
          >
            {children}
          </div>
        </div>
        <div className="modal-footer flex-0 p-2">
          <button
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 float-right"
            onClick={() => onClose()}
          >
            Отмена
          </button>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
}

function generatePin() {
  const arr: string[] = [];
  for (let i = 0; i < 4; ++i) {
    arr.push(String(Math.floor(Math.random() * 10)));
  }
  return arr.join("");
}
