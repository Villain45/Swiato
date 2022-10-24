export default {
    name:'food',
    title:"food",
    type:'document',
    fields:[
        {
            name:'image',
            title:'image',
            type:'image',
            options: {
                hotspot: true //for editing images in the database like crop and all
            }
        },{
            name:'name',
            title:'name',
            type:'string'
        },{
            name:'slug',  //unique id, easily recongized, used to make unique elements
            title:'slug',
            type:'slug',
            options: {
                source:'name',
                maxlength:90
            }
        },{
            name:'price',
            title:'price',
            type:'array',
            of:[{type:'number'}]
        },{
            name:'details',
            title:'details',
            type:'string'
        }
    ]
}