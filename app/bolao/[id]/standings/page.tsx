import { fetchBolao, fetchStandings } from "@/app/lib/data"
import PageTitle from "@/app/components/pageTitle"
import BolaoLinks from "@/app/ui/bolao/bolaoLinks"
import { Standing } from "@/app/lib/definitions"
import clsx from "clsx"
import Image from "next/image"

const thClasses = "font-normal text-sm py-3"

async function getData(bolaoId: string) {
  const bolao = await fetchBolao(bolaoId)

  const year: number = bolao.year
  const leagueId: string = bolao.competition_id

  const standings: Standing[] = await fetchStandings({ leagueId, year })

  console.log(standings)

  return { bolao, standings }
}

async function StandingsPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id)

  if (!data) {
    return <p>Error while loading the bolao.</p>
  }

  return (
    <main>
      <PageTitle center={true} subTitle={data.bolao.year}>
        {data.bolao.name}
      </PageTitle>

      <BolaoLinks bolaoId={data.bolao.id} active={2} />

      <table className="w-full text-xs">
        <thead className="uppercase">
          <tr>
            <th>&nbsp;&nbsp;</th>
            <th className="font-normal text-sm py-3 text-left">club</th>
            <th className={thClasses}>p</th>
            <th className={thClasses}>w</th>
            <th className={thClasses}>d</th>
            <th className={thClasses}>l</th>
            <th className={thClasses}>gf</th>
            <th className={thClasses}>ga</th>
            <th className={thClasses}>gd</th>
            <th className={clsx("font-bold text-sm")}>pts</th>
          </tr>
        </thead>
        <tbody>
          {data.standings.map((el: Standing) => (
            <tr
              key={`${data.bolao.competition_id}_${el.rank}_${el.team.id}`}
              className={clsx("text-center py-5", {
                "bg-slate-50": el.rank % 2 !== 0,
              })}
            >
              <td className="py-3">{el.rank}</td>
              <td className="text-left">
                <Image
                  src={el.team.logo}
                  width={20}
                  height={20}
                  alt={`Logo of ${el.team.name}`}
                  className="inline mr-2"
                />
                {el.team.name}
              </td>
              <td>{el.all.played}</td>
              <td>{el.all.win}</td>
              <td>{el.all.draw}</td>
              <td>{el.all.lose}</td>
              <td>{el.all.goals.for}</td>
              <td>{el.all.goals.against}</td>
              <td>{el.all.goals.for - el.all.goals.against}</td>
              <td className="font-bold">{el.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default StandingsPage