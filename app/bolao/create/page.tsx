import Form from "@/app/ui/bolao/create/form"
import { fetchLeagues } from "@/app/lib/data"
import PageTitle from "@/app/components/pageTitle"

async function CreateBolao() {
  const data = await fetchLeagues()

  return (
    <div>
      <PageTitle center={true}>
        <h1>Create bolão</h1>
      </PageTitle>

      <Form leagues={data} />
    </div>
  )
}

export default CreateBolao
