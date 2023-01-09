import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {

    if (request.method === 'POST') {
        const TOKEN = 'f26f6f6babf659baace59c24d85169'
        const client = new SiteClient(TOKEN)
    
        const registroCriado = await client.items.create({
            itemType: "1118214",
            ...request.body, 
            // title: "Comunidades de Teste",
            // imageUrl: "https://github.com/rafaelwdc.png",
            // creatorSlug: "rafaelwdc"
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}