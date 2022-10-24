// Connection Between the NextJs app and sanityio
import sanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId:"1zn57jtn",
    dataset:'production',
    apiVersion:"2022-07-29",
    useCdn:true,
    token:"sknQAAJ4Jty3jy2vvfIn6z10sWJ47y6Vd9iynoPiqG2naRXSAmvV7LECPLwSAiIrf3PBinyHdcMybFHxotjPf4ehjAWGJgDlmryZChhS3D1w9s22oLv0oLplCjA1PCeNoS0BOmBUsAv5nJKKJZwg7v9YEekwjXGr7uqKisrXInZFMXwqf0vi"
})

const builder = ImageUrlBuilder(client);

//to load images from database to client side
export const urlFor = (source) => builder.image(source)