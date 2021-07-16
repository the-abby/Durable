const fs = require("fs");
const https = require('https');
const fetch = require("node-fetch");
const request = require("request")
const {
    AlignmentType,
    convertInchesToTwip,
    Document,
    HeadingLevel,
    LevelFormat,
    Packer,
    Paragraph,
    WidthType,
    ImageRun,
    HorizontalPositionAlign,
} = require("docx");


var products = [
    {
        name : "Brighton Dining Set",
        brandName: "Alfonso",
        img : "https://vermontwoodsstudios.com/bmz_cache/9/9f3d8d188768599b7495b0414afe9acf.image.745x571.jpg",
        description : "Our Brighton Dining Set simply transcends contemporary style with its widely rounded angles and clean mid-century modern lines. Character and personality are artfully captured in the precise attention to detail carefully applied to every facet of this fine furniture set. The choice of  natural cherry or walnut hardwoods only further enhances the modest detailing. Make it a part of your home today."
    },
    {
        name : "Small Classic Shaker Dinette Set",
        brandName: "Alfonso",
        img : "https://vermontwoodsstudios.com/bmz_cache/1/14da33ed92c40ff85e0f4346a5608d6f.image.745x689.jpg",
        description : "Envision sitting down and enjoying your next meal with our Small Classic Shaker Dinette Set. Traditional style meets compact design in this high-quality dining set. Finely crafted in Vermont using sustainably harvested wood, this set is a great space saver for any kitchen and built to last a lifetime."
    },
    {
        name : "Metamorphic Table Lamp",
        brandName: "Alfonso",
        img : "https://vermontwoodsstudios.com/bmz_cache/e/efd124ff22562d5fbd285845c44c7eb6.image.745x745.jpg",
        description : "Contemporary style with a slight Asian influence best describes Hubbardton Forge's Metra Metamorphic Table Lamp. Whether you're looking for that beautiful accent piece for your living room end table or a useful reading lamp for your bedside nightstand, this lamp will be just the trick."
    },
    {
        name : "Pluto Table Lamp",
        brandName: "Alfonso",
        img : "https://vermontwoodsstudios.com/bmz_cache/7/7920d5f580badf4b3603e51dd588c343.image.745x745.jpg",
        description : "Remember when Pluto was still a planet? We sure do. Hubbardton Forge artisans all agreed and decided to immortalize Pluto in their Pluto Table Lamp. Finely handcrafted in iron and glass, this table lamp exudes an extraterrestrial vibe in its rounded lines and shapes. Take a  trip into the far reaches of our solar system from the comfort of your own home with this one-of-a-kind table lamp."
    },

    {
        name : "Forged Leaves and Glass Table Lamp",
        brandName: "Alfonso",
        img : "https://vermontwoodsstudios.com/bmz_cache/b/ba5a874994dc8b8db9efd809a9cd642d.image.745x745.jpg",
        description : "Looking for that unique table lamp that stands out from the rest? Well, look no further than our Hubbardton Forge hand-made Forged Leaves with Glass Table Lamp. A beautiful organic leaf design hand-forged in wrought iron are further enhanced by its soft warm glow from your choice of translucent glass and metal finish. Great for any room of your home."
    },
    {   name : "New York Contemporary Sofa Table",
        brandName: "Alfonso",
        img : "https://vermontwoodsstudios.com/bmz_cache/8/80b4a4de6f4c65f8dc6a8e44a0bf72f0.image.745x745.jpg",
        description : "Our high end New York Contemporary Sofa Table features artistic flair with modern sensibilities. This unique piece provides a wonderful way to show off your treasures wherever you wish in style. It has a simple, modern design that will blend in perfectly in any contemporary or modern living room. Available in cherry, maple, oak and walnut hardwood. Choose a natural finish or select from our large variety of wood stains. This sofa table is made to order and built in Vermont using sustainably harvested woods."
        }, 
{
     name : "Taper Torchiere",
    brandName: "Baker",
    img : "https://vermontwoodsstudios.com/bmz_cache/6/6548ada4534dbcb8ee594c3b75ecdb86.image.745x745.jpg",
    description : "The long three piece column topped with a frosted glass bowl shade found in our Taper Torchiere Lamp speaks to the forms of the tall candle torches from times long gone. Hubbardton Forge artisans have captured the essence of antique design in a contemporary style floor lamp sure to captivate all. The upward radiance emitted from the top of this unique lamp casts a luminescent glow on all of its surroundings."
},

 {   name : "Classic Shaker Writing Desk - Floor Model",
   brandName: "Baker",
   img : "https://vermontwoodsstudios.com/bmz_cache/3/3d8fbeeff9146bf3d186a4d106cf8a32.image.745x745.jpg",
   description : "This item is currently in our showroom in Vernon, VT and except in special circumstances will only be available for 'cash and carry' purchase directly from our showroom. Please contact us by phone at 802-579-1302 if you would like to discuss other purchase arrangements."
},

{   name : "Modern Shaker 4-Door Bookcase - Floor Model",
   brandName: "Baker",
   img : "https://vermontwoodsstudios.com/bmz_cache/e/ef707dd51be4c99c167974fd8d4a8a20.image.745x745.jpg",
   description : "This item is currently in our showroom in Vernon, VT and except in special circumstances will only be available for 'cash and carry' purchase directly from our showroom. Please contact us by phone at 802-579-1302 if you would like to discuss other purchase arrangements."
},

{   name : "Monterey 6 Drawer Dresser",
   brandName: "Baker",
   img : "https://vermontwoodsstudios.com/images/dressers/monterey-6-drawer-dresser.jpg",
   description : "Copeland's luxury, cherry wood, Monterey 6 Drawer Dresser fuses American Art's & Crafts style with modern Japanese and Asian design. Handmade with natural cherry wood, this high end dresser can be customized online with your choice of 5 shades of cherry. Use the drop-down menu to see the choices for either natural cherry (no stain) or windsor cherry, autumn cherry, cognac cherry, saddle cherry or smoke cherry. Optional jewlery - accessory case is available. Our luxury Monterey Furniture Collection is handmade in Vermont using eco-friendly, sustainably harvested cherry wood."
},

{   name : "Nest Pendant",
   brandName: "Baker",
   img : "https://vermontwoodsstudios.com/bmz_cache/d/dd93119dd193c41adf0f7fc56a98704d.image.745x745.jpg",
   description : "The Nest Pendant from Hubbardton Forge conjures up images of three baby birds safely nestled at its center with its twining steel outer form surrounding three clear glass sources of light. Organic lines combine with industrial construction to form the essence of this handcrafted modern light fixture. Contoured details in the blown glass shades add an extra subtle detail that encourages all to take a closer look. Create the perfect focal point for your dining area with a Nest Pendant of your own."
},

{   name : "Mobius Large Pendant",
   brandName: "Baker",
   img : "https://vermontwoodsstudios.com/bmz_cache/3/3d8f887184e244dcb5f5a0b42808a0d5.image.745x745.jpg",
   description : "Discover the Mobius Strip with the Mobius Large Pendant. Designed by Hubbardton Forge's award-winning artisans, the softened Mobius design centers around a continuous form that flows in and out of itself in one single piece, simultaneously representing both an inside and outside boundary."
},

{   name : "French Country Oval Coffee Table",
   brandName: "Artistica",
   img : "https://vermontwoodsstudios.com/bmz_cache/a/a87c00c98ebc8dcfbd6429dee5c655ce.image.745x745.jpg",
   description : "Our high-end, solid wood French Country Coffee Table is perfect for your upscale living room, den or study. The perfect piece on which to place a drink, store your favorite book or rest your feet."
},
{   name : "Essentials Round Coffee Table",
   brandName: "Artistica",
   img : "https://vermontwoodsstudios.com/bmz_cache/a/af143f4ac22b19f3750a15545803ca0f.image.745x745.jpg",
   description : "Mid-century modern design that embraces genuine American craftsmanship.  Our Essentials Round Coffee Table blends natural walnut or cherry hardwood and industrial metal to create a retro style right out of the 1950s. Expertly constructed in Vermont using sustainably harvest materials, every coffee table is made-to-order just for you."
},
{   name : "Contemporary Craftsman Mirror",
   brandName: "Artistica",
   img : "https://vermontwoodsstudios.com/images/mirrors/contemporary-craftsman-mirror.jpg",
   description : "Our Contemporary Craftsman large, wood framed accent mirror features a beautiful solid cherry or maple frame with a gentle arch, walnut cap piece and fine detailing. This mirror works great as an accent mirror over your dresser, sideboard, hall table or anywhere you need to make that extra statement. Made in Vermont by fine furniture makers using premium quality sustainably harvested wood with an eco-friendly oil finish."
},
{   name : "Natural Cherry Dresser Mirror",
   brandName: "Artistica",
   img : "https://vermontwoodsstudios.com/bmz_cache/d/d63725b9c8d056972d202e67b6a62154.image.745x745.jpg",
   description : "This handcrafted Natural Cherry Dresser Mirror features a beautiful arched hardwood frame and good old fashioned New England detail. Makes a great dresser mirror, or accent mirror over your sideboard or console table, for your foyer or hallway. All of our fine furniture is handcrafted in Vermont using sustainably harvested solid wood. Add a finishing touch to any room with our large Natural Cherry Dresser Mirror!"
},
{   name : "Monterey Cherry Storage Bed",
   brandName: "Artistica",
   img : "https://vermontwoodsstudios.com/bmz_cache/2/20061c8ef3da3dc853fd22f7aef61b6a.image.745x745.jpg",
   description : "Luxury, high end, solid cherry wood, Monterey Bed with underbed storage fuses American Art's & Crafts style with modern Japanese and Asian design."
},         
{   name : "Sarah Sleigh Bed - Low Footboard",
   brandName: "Artistica",
   img : "https://vermontwoodsstudios.com/bmz_cache/b/b4eaac13305af8466783ea9f7c1f9927.image.745x745.jpg",
   description : "American Shaker design gives Copeland's Sarah Sleigh Bed with Low Footboard a clean look with elegant proportions. This luxury solid cherry wood platform bed features a large, inclined headboard and simple low footboard for ease when making the bed. "
},         
{   name : "Bella Chandelier",
   brandName: "Interlude Home",
   img : "https://vermontwoodsstudios.com/bmz_cache/2/20775401fed362f47b01f317941463d5.image.745x745.jpg",
   description : "Like something out of a fairy tale book, the Bella Chandelier is sheer elegance in a stunning luminescent form. Handcrafted by Hubbardton Forge artisans, the Bella Chandelier is all graceful sweeping curves with six candelabra-style bulbs reaching upwards from its steelwork. The effect of the soft light glinting off of the expertly forged metal creates a dreamlike atmosphere to your surroundings. Escape into a world of sophisticated charm with a Bella Chandelier in your own home."
},         
{   name : "Carousel Chandelier",
   brandName: "Interlude Home",
   img : "https://vermontwoodsstudios.com/bmz_cache/a/ab53fd293784b6f81457f2f9c611a9c9.image.745x745.jpg",
   description : "Calling to mind warm childhood memories, the Carousel Chandelier features a flawless geometric silhouette reminiscent of the cherished carnival ride. Six small candelabra lights nestle along the inner form casting a soft light that reflects and glistens off of the hand-forged steel surrounding it. Take a step back into your treasured past every time you sit down to a meal and admire the twinkling illumination that a Carousel Chandelier adds to your dining area."
},         
{   name : "Twining Leaf Mini Pendant",
   brandName: "Interlude Home",
   img : "https://vermontwoodsstudios.com/bmz_cache/7/70d7220a0f770ff4ecd63044047b53c4.image.745x745.jpg",
   description : "A flawless example of Sylvan design, our Twining Leaf Mini Pendant by Hubbardton Forge evokes a sense of natural harmony for the home. The hand-forged leaf form found at the center of this artful design has become a treasured silhouette for Hubbardton Forge artisans and recognizable for its one-of-a-kind tailoring. All who gaze upon this timeless pendant become engrossed in the meandering tendril of iron encircling a delicate glass shade. "
},         
{   name : "Flora Up Light Mini Pendant",
   brandName: "Interlude Home",
   img : "https://vermontwoodsstudios.com/bmz_cache/9/958cb1882b3048f37c71f43ab584b3b8.image.745x745.jpg",
   description : "You've never experienced a natural organic design blended so perfectly with modern craftsmanship until you've gazed at the Flora Up Light Mini Pendant from Hubbardton Forge. Two delicate tendrils of hand-curved steel frame in the soft glow of an equally delicate glass shade. This designer lighting piece will soften the mood in any room with its simple meandering lines and soothing yet lively presence. "
},         
{   name : "Exeter Cherry Side Chair - Floor Model",
   brandName: "Interlude Home",
   img : "https://vermontwoodsstudios.com/images/dining-room/Exeter-Graphite.jpg",
   description : "This item is currently in our showroom in Vernon, VT and except in special circumstances will only be available for 'cash and carry' purchase directly from our showroom. Please contact us by phone at 802-579-1302 if you would like to discuss other purchase arrangements."
},       
{   name : "Morgan Shaker Chair - Floor Model",
   brandName: "Interlude Home",
   img : "https://vermontwoodsstudios.com/bmz_cache/1/1dafa4c514d6c5314958ff12876efcf8.image.745x745.jpg",
   description : "The Shaker style Copeland Sarah Morgan dining chairs in solid American Black Cherry with plush microfiber upholstered back and seat. Comfortable Shaker dining chairs available in side or arm chair style, designed to wear well with highly durable and luxurious polyester fabric. Best in its class of authentic custom fine dining furniture, this fully upholstered dining chair is destined to be a cherished family heirloom! "
},         

{   name : "Modern Industrial End Table - Floor Model",
   brandName: "Knowlton",
   img : "https://vermontwoodsstudios.com/bmz_cache/e/ee0c77c277a260ac9795ebf56c46d129.image.745x745.jpg",
   description : "This item is currently in our showroom in Vernon, VT and except in special circumstances will only be available for 'cash and carry' purchase directly from our showroom. Please contact us by phone at 802-579-1302 if you would like to discuss other purchase arrangements. "
},       
{   name : "Birch Song - Floor Model",
   brandName: "Knowlton",
   img : "https://vermontwoodsstudios.com/bmz_cache/9/9da96a69677dd117ebd7f6cb3a945654.image.745x745.jpg",
   description : "This item is currently in our showroom in Vernon, VT and except in special circumstances will only be available for 'cash and carry' purchase directly from our showroom. Please contact us by phone at 802-579-1302 if you would like to discuss other purchase arrangements."
},         
{   name : "Classic Country Buffet & Hutch",
   brandName: "Knowlton",
   img : "https://vermontwoodsstudios.com/images/dining-room/vermont-buffet-hutch.jpg",
   description : "Add plenty of doors, drawers, shelves and extra storage space to your kitchen or dining room with the Classic Vermont Buffet and Hutch. Order today and you will treasure this Buffet and Hutch for generations to come!"
},         
{   name : "Cherry Moon China Cabinet & Sideboard 51inches",
   brandName: "Knowlton",
   img : "https://vermontwoodsstudios.com/bmz_cache/7/76c1d42cfcc25f7c342f727dd20e0f3e.image.745x745.jpg",
   description : "This piece features wonderful contemporary Asian styling as well as plenty of extra storage space. Showcase all your treasures behind the glass doors. Our dining room furniture is handmade from carefully selected natural hardwoods grown in sustainable forests. It is handcrafted by Vermont furniture craftsmen to produce high quality piece furniture for your upscale green home"
},         
{   name : "Manchester Two-Tone Writing Desk",
   brandName: "Knowlton",
   img : "https://vermontwoodsstudios.com/bmz_cache/7/746ed59ca8c5af35b33aaac7176b4471.image.745x745.jpg",
   description : "This item is currently in our showroom in Vernon, VT and except in special circumstances will only be available for 'cash and carry' purchase directly from our showroom. Please contact us by phone at 802-579-1302 if you would like to discuss other purchase arrangements."
},        
{   name : "Manchester Compact Desk",
   brandName: "Knowlton",
   img : "https://vermontwoodsstudios.com/bmz_cache/0/043aaf0a54b5c4ba537bfe01abfdc110.image.745x745.jpg",
   description : "This item is currently in our showroom in Vernon, VT and except in special circumstances will only be available for 'cash and carry' purchase directly from our showroom. Please contact us by phone at 802-579-1302 if you would like to discuss other purchase arrangements."
},          

{   name : "Corner TV Stand 54inches",
   brandName: "Noir",
   img : "https://vermontwoodsstudios.com/images/living-room/corner-tv-media-console.jpg",
   description : "Our Corner TV-Media Stand is handmade in Vermont and can be customized for your flat screen TV size! Our solid hardwood is sustainably harvested making it a beautiful and responsible choice. This TV-Entertainment Center has a modern look, and will fit perfectly into any corner of your home!"
},      
{   name : "New York Contemporary TV Stand 1",
   brandName: "Noir",
   img : "https://vermontwoodsstudios.com/images/living-room/contemporary-tv-stand.jpg",
   description : "Our New York Contemporary TV Stand is perfect for housing flat screen TV's and all your other media equipment. It has a simple, modern design that will blend in perfectly in any contemporary living room."
},       
{   name : "Modern Farmhouse Walnut Tractor Seat Counter Stool",
   brandName: "Noir",
   img : "https://vermontwoodsstudios.com/bmz_cache/4/4fcfc73640daa7a144c15fb7c4a6c0c9.image.745x745.jpg",
   description : "The conforming scooped seat design of Copeland's Tractor Seat Counter Stool gives dining comfort a whole new meaning for the modern home. Handcrafted in solid natural walnut wood,  the seat rests atop four slightly splayed seared ash wood legs creating a durable seat with a designer vibe. This stool will look fantastic paired with your kitchen island or with Copeland's matching Modern Farmhouse Counter Height Farm Table in Walnut. Add an extra touch of contemporary style and comfort to your home with a set of Tractor Seat Counter Stools of your own."
},       
{   name : "Estelle Bar Stool",
   brandName: "Noir",
   img : "https://vermontwoodsstudios.com/bmz_cache/d/d1aa66e55682dd846e8ebce351384402.image.745x745.jpg",
   description : "Copeland's  high end Estelle Bar Stool features the essence of mid-century modern, minimalist design. Sculpted in solid American Cherry wood, this unique bar stool has a slender, vertically split back and finely sculpted seat for the ultimate in comfort. Rounded, angular tapered legs complete the stunning contemporary design. Available in natural cherry (no stain) or windsor cherry, autumn cherry, cognac cherry, saddle cherry or smoke cherry. Best in its class of authentic custom fine dining furniture, this retro-styled cherry wood stool is destined to be the focal point of your upscale modern kitchen!"
},       
{   name : "French Country Sofa Table",
   brandName: "Noir",
   img : "https://vermontwoodsstudios.com/bmz_cache/a/abbbf0101ded7e0d4a20172c3bd12cef.image.745x745.jpg",
   description : "Our premium-quality, solid wood French Country Sofa Table is perfect for your home. You'll love the added luxury, style and convenience that comes with an extra space to place gloves or display photos, vases or artwork."
},  
{   name : "New York Contemporary Sofa Table",
   brandName: "Noir",
   img : "https://vermontwoodsstudios.com/bmz_cache/8/80b4a4de6f4c65f8dc6a8e44a0bf72f0.image.745x745.jpg",
   description : "Our high end New York Contemporary Sofa Table features artistic flair with modern sensibilities. This unique piece provides a wonderful way to show off your treasures wherever you wish in style. It has a simple, modern design that will blend in perfectly in any contemporary or modern living room. Available in cherry, maple, oak and walnut hardwood. Choose a natural finish or select from our large variety of wood stains. This sofa table is made to order and built in Vermont using sustainably harvested woods."
},            
]

const getBuffer = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer;
    } catch (error) {
      return { error };
    }
  };

async function getImage(url){
    let myBuffer = null
    await request({ url, encoding: null }, (err, resp, buffer) => {
         // Use the buffer
         // buffer contains the image data
         // typeof buffer === 'object'
         myBuffer = buffer;
    });

    return myBuffer;
}


products.forEach(async (product) => {
    let image;

    image = await getBuffer(product.img);
    const doc = new Document({
        creator: "Durable Furnitures",
        title: product.name,
        description: "",
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 30,
                        bold: true,
                        color: "DE4121",
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    },
                },
                heading2: {
                    run: {
                        size: 40,
                        bold: true,
                    },
                    paragraph: {
                        spacing: {
                            before: 240,
                            after: 120,
                        },
                    },
                },
                listParagraph: {
                    run: {
                        color: "#FF0000",
                    },
                },
            },
            paragraphStyles: [
                {
                    id: "aside",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: "999999",
                        italics: true,
                    },
                    paragraph: {
                        indent: {
                            left: convertInchesToTwip(0.5),
                        },
                        spacing: {
                            line: 276,
                        },
                    },
                },
                {
                    id: "wellSpaced",
                    name: "Well Spaced",
                    basedOn: "Normal",
                    quickFormat: true,
                    paragraph: {
                        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
                    },
                },
            ],
        },
        numbering: {
            config: [
                {
                    reference: "my-crazy-numbering",
                    levels: [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_LETTER,
                            text: "%1)",
                            alignment: AlignmentType.LEFT,
                        },
                    ],
                },
            ],
        },
        sections: [
            {
                children: [
                    new Paragraph({
                        text: "Durable Furnitures",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph(product.brandName),
                    new Paragraph({
                        text: product.name,
                        heading: HeadingLevel.HEADING_2,
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: image,
                                transformation: {
                                    width: 600,
                                    height: 400,
                                },
                            }),
                        ],
                    }),
                    new Paragraph({
                        text: product.description,
                        style: "wellSpaced",
                    }),
                ],
            },
        ],
    });
    
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`${product.name}.docx`, buffer);
    });
})

