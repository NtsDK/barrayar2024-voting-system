"use client";

import clsx from "clsx";

import { fetchFilteredCouncilSessions } from "@/app/lib/sessionData";
import { CopySessionInfoToClipboard, DeleteSession, UpdateSession } from "./buttons";
import { COUNCIL_SESSION_STATUS_I18N } from "@/constants";
import { Card } from "../questions/card";
import { CreateQuestion } from "../questions/buttons";
import { Button } from "../common/button";
import { CouncilSessionsList } from "@/app/lib/definitions2";
import { useState } from "react";

export default async function VorHousesDisplayTable({ sessions }: { sessions: CouncilSessionsList[] }) {
  const [showStatus, setShowStatus] = useState<"not-finished" | "all">("not-finished");

  return (
    <div className="mt-6 flow-root">
      <div>
        <div className="flex">
          <Button
            type="button"
            onClick={() => {
              setShowStatus("not-finished");
            }}
            className={clsx("mr-4", {
              "opacity-50": showStatus === "all",
            })}
          >
            Только не завершенные
          </Button>
          <Button
            type="button"
            onClick={() => {
              setShowStatus("all");
            }}
            className={clsx("mr-4", {
              "opacity-50": showStatus === "not-finished",
            })}
          >
            Все
          </Button>
        </div>
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {sessions
            ?.filter((session) => {
              if (showStatus === "all") {
                return true;
              }
              return session.status !== "finished";
            })
            .map((session) => (
              <div key={session.id} className="mb-10 px-8 py-6">
                <div className="flex mb-12">
                  <div className="flex-1">
                    <h2 className="text-2xl">{session.title}</h2>
                    <div className="text-gray-600 italic mb-4">{session.date_time}</div>
                    <div>
                      Статус сессии: <span className="italic">{COUNCIL_SESSION_STATUS_I18N[session.status]}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 h-10">
                    <CreateQuestion id={session.id} />
                    <CopySessionInfoToClipboard session={session} />
                    <UpdateSession id={session.id} />
                    <DeleteSession id={session.id} />
                  </div>
                </div>
                <div className="ml-8">
                  {session.questions.map((question, index) => (
                    <Card
                      key={question.id}
                      question={question}
                      className={clsx({
                        "mb-16": index + 1 !== session.questions.length,
                      })}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
