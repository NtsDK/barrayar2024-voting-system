import Image from "next/image";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredPersons } from "@/app/lib/personData";
import { fetchCountessRequests } from "@/app/lib/countessRequestData";
import { DeleteCountessRequest, UpdateCountessRequest } from "./buttons";
import { CountessSessionRequestTable2 } from "@/app/lib/voteDefinitions";
import * as R from "ramda";
import { fetchCountessRequestSessions, fetchFilteredCouncilSessions } from "@/app/lib/sessionData";
import { CouncilSession } from "@/app/lib/definitions2";

type SessionInfo = {
  session: CouncilSession;
  date_time: string;
  countessRequests: CountessSessionRequestTable2[];
};

export default async function CountessRequestsTable({ query, currentPage }: { query: string; currentPage: number }) {
  const [countessRequests, sessions] = await Promise.all([fetchCountessRequests(), fetchFilteredCouncilSessions()]);
  const sessionIndex = R.indexBy(R.prop("id"), sessions);

  // console.log("sessionIndex", sessionIndex);
  // console.log("countessRequests", countessRequests);

  const sessionInfoIndex = countessRequests.reduce((acc: Record<string, SessionInfo>, request) => {
    if (!acc[request.session_id]) {
      acc[request.session_id] = {
        session: sessionIndex[request.session_id],
        date_time: sessionIndex[request.session_id].date_time,
        countessRequests: [],
      };
    }
    acc[request.session_id].countessRequests.push(request);
    return acc;
  }, {});

  const sessionInfos = R.sortBy(R.prop("date_time"), R.values(sessionInfoIndex));

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {sessionInfos.map((sessionInfo) => (
            <div key={sessionInfo.session.id} className="m-6">
              <div className="text-lg">{sessionInfo.session.title}</div>
              {sessionInfo.countessRequests.map((countessRequest) => (
                <div key={countessRequest.id} className="flex ml-8 my-4">
                  <div className="flex-auto">
                    <div className="text-lg">{countessRequest.house_name}</div>
                    <div className="text-gray-600 italic">{countessRequest.timestamp.toLocaleString()}</div>
                    {/* <pre>{JSON.stringify(countessRequest.question_requests, null, "  ")}</pre> */}
                  </div>
                  <div className="flex-grow-0 flex-shrink-0">
                    <div className="flex justify-end gap-3">
                      <UpdateCountessRequest
                        id={countessRequest.id}
                        editable={sessionInfo.session.status !== "finished"}
                      />
                      <DeleteCountessRequest id={countessRequest.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
