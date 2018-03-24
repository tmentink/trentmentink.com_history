
// ------------------------------------------------------------------------
// base/data.js
// ------------------------------------------------------------------------


  var page = (function(page) {
    "use strict";

    // --------------------------------------------------------------------
    // Project Data
    // --------------------------------------------------------------------
    
    page.data = {};
    page.data.projects = [
      {
        title       : "gmaps",
        category    : "Javascript",
        description : "A JavaScript library that simplifies the development of Google Maps web applications. Get started with gmaps, the way maps were meant to be made!",
        image       : "img/projects/gmaps.jpg",
        links: [
          {
            href : "http://gmapsjs.com",
            text : "View Website"
          },
          {
            href : "https://www.github.com/tmentink/gmaps",
            text : "View Github"
          }
        ]
      },
      {
        title       : "jQuery Geocomplete",
        category    : "Javascript",
        description : "A jQuery plugin for Google Maps Autocomplete. Easily autofill address forms or center a map based on the selected location.",
        image       : "img/projects/jquery_geocomplete.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/jquery_geocomplete",
            text : "View Demo"
          },
          {
            href : "https://www.github.com/tmentink/jquery.geocomplete",
            text : "View Github"
          }
        ]
      },
      {
        title       : "Poly - Split",
        category    : "Javascript",
        description : "A Google Maps plugin that extends the polygon object with a new method to easily split it in two. Simply draw a polygon over another and the plugin will split out the difference.",
        image       : "img/projects/poly_split.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/polygon_splitting",
            text : "View Demo"
          },
          {
            href : "https://www.github.com/tmentink/google-maps-polygon-splitting",
            text : "View Github"
          }
        ]
      },
      {
        title       : "Sliding Puzzle",
        category    : "Gaming",
        description : "Sliding Puzzle is a HTML5 game that randomly shuffles images into tiles. If you get stuck, you can click solve and watch the AI find the shortest possible solution. All images were created by Kelly N. Hagan.",
        image       : "img/projects/sliding_puzzle.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/sliding_puzzle",
            text : "Play Game"
          },
          {
            href : "https://www.github.com/tmentink/sliding_puzzle",
            text : "View Github"
          }
        ]
      },
      {
        title       : "The Frameshop",
        category    : "Website",
        description : "The Frameshop is a family owned business specializing in custom framing. I worked closely with them to design and develop a brand new mobile-friendly website.",
        image       : "img/projects/frameshop.jpg",
        links: [
          {
            href : "http://www.theframeshopsite.com",
            text : "View Website"
          }
        ]
      },
      {
        title       : "Simon Says",
        category    : "Gaming",
        description : "Simon Says is a web based game that utilizes HTML5 features like data attributes, audio and local storage. Test your memory with this fresh take on a classic.",
        image       : "img/projects/simon_says.jpg",
        links: [
          {
            href : "http://projects.trentmentink.com/simon_says",
            text : "Play Game"
          },
          {
            href : "https://www.github.com/tmentink/simon_says",
            text : "View Github"
          }
        ]
      }
    ];


    // --------------------------------------------------------------------
    // Artwork Data
    // --------------------------------------------------------------------
    
    page.data.artwork = [
        {
            title       : "Rising Sun",
            tags        : ["Featured", "Digital"],
            img         : "risingsun.png",
            thumb       : "risingsun.jpg",
            description : "Simple is beautiful. But simple is also really hard. This is by far the most challenging and rewarding piece of artwork I have ever created."
        },
        {
            title       : "Tule Fields",
            tags        : ["Featured", "Digital"],
            img         : "tulefields.jpg",
            thumb       : "tulefields.jpg",
            description : "This drawing was inspired by the rice fields near my home town of Yuba City. Some of my fondest memories with my dad were made out in the duck blind."
        },
        {
            title       : "Yellowstone Waterfall",
            tags        : ["Featured", "Pencil"],
            img         : "yellowstonewaterfall.jpg",
            thumb       : "yellowstonewaterfall.jpg",
            description : "This piece is rather special to me because I swear it drew itself. During a trip to the family cabin in Montana I felt an urge to draw something. With no real plan in mind, I just started drawing and watched as it came to life."
        },
        {
            title       : "Mountain Reflection",
            tags        : ["Featured", "Pencil"],
            img         : "mountainreflection.jpg",
            thumb       : "mountainreflection.jpg",
            description : "I remember thinking I wanted to draw a really complicated mountain range. Afterwards, I wanted to draw reflections in the lake and immediately wished I had drawn simpler mountains."
        },
        {
            title       : "Ocean Sunset",
            tags        : ["Digital"],
            img         : "oceansunset.jpg",
            thumb       : "oceansunset.jpg",
            description : "This was my first piece of digital artwork. After spending so much time with graphite pencils, I was eager to draw something more colorful."
        },
        {
            title       : "Moonlit Mountains",
            tags        : ["Digital"],
            img         : "moonlight.jpg",
            thumb       : "moonlight.jpg",
            description : "This drawing was an experiment in lighting and I absolutely love the way the clouds turned out. It also makes me really want to visit Alaska."
        },
        {
            title       : "At Peace",
            tags        : ["Pencil"],
            img         : "atpeace.jpg",
            thumb       : "atpeace.jpg",
            description : "This was one of my earlier drawings when I was experimenting with a new cloud technique. It was inspired by all the late night fishing trips I've had with my dad."
        },
        {
            title       : "Mountain Rapids",
            tags        : ["Pencil"],
            img         : "mountainrapids.jpg",
            thumb       : "mountainrapids.jpg",
            description : "If you haven't noticed by now, I kind of have a thing for mountains..."
        },
        {
            title       : "Ravens Logo",
            tags        : ["Pencil"],
            img         : "ravenslogo.jpg",
            thumb       : "ravenslogo.jpg",
            description : "I've been a big Baltimore Ravens fan since 2005. I drew this logo during their magical Super Bowl run in Ray Lewis' final season."
        },
        {
            title       : "Cosette",
            tags        : ["Pencil"],
            img         : "cosette.jpg",
            thumb       : "cosette.jpg",
            description : "I really enjoyed watching the movie Les Misérables and wanted to draw something from it. This piece was inspired by the original artwork created by Émile Bayard in 1862."
        },
        {
            title       : "Dolphins",
            tags        : ["Pencil"],
            img         : "dolphins.jpg",
            thumb       : "dolphins.jpg",
            description : "This piece has some Polynesian influences and was drawn for a friend of mine that loves dolphins."
        },
        {
            title       : "Kingfisher",
            tags        : ["Pencil"],
            img         : "kingfisher.jpg",
            thumb       : "kingfisher.jpg",
            description : "I made this guy for my sister's birthday when she told me she wanted a drawing of a bird. I typically stick to nature landscapes but I really love the way the head feathers turned out."
        },
        {
            title       : "Farmhouse",
            tags        : ["Pencil"],
            img         : "farmhouse.jpg",
            thumb       : "farmhouse.jpg",
            description : "I drew a lot when I was growing up but stopped when I got to middle school. In my last few years of college I decided to take it back up and this was the first thing I drew."
        },
        {
            title       : "Misty Mountains",
            tags        : ["Pencil"],
            img         : "mistymountains.jpg",
            thumb       : "mistymountains.jpg",
            description : "This drawing was created while following a YouTube tutorial by TylersArtShack. This video taught me a lot including the technique to create realistic clouds."
        },
        {
            title       : "Cresent Earth",
            tags        : ["Pencil"],
            img         : "cresentearth.jpg",
            thumb       : "cresentearth.jpg",
            description : "I briefly worked with prismacolor pencils before transitioning into digital artwork. At the time I was reading a lot about space and wanted to try to draw colorful gas clouds."
        },
        {
            title       : "Autumn Tree",
            tags        : ["Featured", "Pencil"],
            img         : "autumntree.jpg",
            thumb       : "autumntree.jpg",
            description : "One thing I loved about the prismacolor pencils is how you could blend colors together using baby oil and a Cuetip. It was fun to work with but it was hard to draw the same level of detail I was accustomed to."
        },
        {
            title       : "The Enchantments",
            tags        : ["Featured", "Photography"],
            img         : "theenchantments.jpg",
            thumb       : "theenchantments.jpg",
            description : "This picture was taken during my backpacking trip into the Enchantments in Washington. The views were absolutely breathtaking and totally worth the 21 miles of hiking."
        },
        {
            title       : "Base Camp",
            tags        : ["Photography"],
            img         : "basecamp.jpg",
            thumb       : "basecamp.jpg",
            description : "This was the view from our campsite next to Snow lake. Luckily we were able to find a nice level spot of dirt and didn't have to sleep on top rocks."
        },
        {
            title       : "Nada Lake",
            tags        : ["Photography"],
            img         : "nadalake.jpg",
            thumb       : "nadalake.jpg",
            description : "This was taken during the last day of our trip. Although I was exhausted and couldn't wait to get back home, some of the views were just too stunning to pass up."
        },
        {
            title       : "Prusik Pass",
            tags        : ["Photography"],
            img         : "prusikpass.jpg",
            thumb       : "prusikpass.jpg",
            description : "If you've ever seen a mountain goat in its natural habitat then you know just how amazing they are at climbing. The Rangers warned us that they can be a little too friendly at times and will try to lick the salt right off you..."
        },
        {
            title       : "Enchantment Basin",
            tags        : ["Photography"],
            img         : "enchantmentbasin.jpg",
            thumb       : "enchantmentbasin.jpg",
            description : "This is one of the many alpine lakes that the Enchantments is known for. Although it was the middle of June, there was still a lot of snow in the upper core."
        },
        {
            title       : "On The Lookout",
            tags        : ["Featured", "Photography"],
            img         : "onthelookout.jpg",
            thumb       : "onthelookout.jpg",
            description : "I found this guy among the wildflowers on Table Mountain in Oroville California. I swear he knew I was taking his picture because he would look back at me several times and then strike a pose."
        },
        {
            title       : "The Freak",
            tags        : ["Featured", "Photography"],
            img         : "thefreak.jpg",
            thumb       : "thefreak.jpg",
            description : "This was taken during a father son trip to AT&T park when the Giants blew out the Brewers and a fly ball landed perfectly in my dad's cup holder."
        },
        {
            title       : "Paint It Black",
            tags        : ["Photography"],
            img         : "paintitblack.jpg",
            thumb       : "paintitblack.jpg",
            description : "Our family was lucky enough to watch Bob Dylan, The Rolling Stones, Neil Young, Paul McCartney, The Who and Roger Waters rock the stage at the first ever Desert Trip concert."
        }
    ];


    return page;

  })(page || {});

