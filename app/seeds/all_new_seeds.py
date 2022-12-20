from app.models import db, User, Store, Item, Review

def seed_users():
    demo = User(
        username='Demo_User',
        email='demo@aa.io',
        password='password')
    girl_power = User(
        username='Girl_Power',
        email='girl_power@aa.io',
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537967/Stories%20%2B%20Stickers/girl_power_profile_pic_sryseh.png",
        password='password')
    chill_teacher = User(
        username='Chill_Teacher',
        email='chill@aa.io',
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537952/Stories%20%2B%20Stickers/teacher_profile_pic_szptjd.png",
        password='password')
    awesome_ta = User(
        username="Awesome_TA",
        email="awesome@aa.io",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537945/Stories%20%2B%20Stickers/vampire_profile_pic_hipnex.png",
        password='password')
    user5 = User(
        username="Killian",
        email="hook@aa.io",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668649070/Stories%20%2B%20Stickers/other%20users/Untitled_design_11_fowk5a.png",
        password='password'
    )
    user6 = User(
        username="Regina",
        email="queen@aa.io",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1669681179/Stories%20%2B%20Stickers/other%20users/regina-pro-pic_eysgoy.png",
        password='password'
    )
    user7 = User(
        username="Margaret",
        email="snow@aa.io",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1669681176/Stories%20%2B%20Stickers/other%20users/mar-pro-pic_lpocna.png",
        password='password'
    )
    user8 = User(
        username="David",
        email="charming@aa.io",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1669681186/Stories%20%2B%20Stickers/other%20users/charming-pro-pic_nmnpco.png",
        password='password'
    )
    user9 = User(
        username="Emma",
        email="swan@aa.io",
        image_profile_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1669681182/Stories%20%2B%20Stickers/other%20users/emma-pro-pic_jy5iyt.png",
        password='password'
    )


    db.session.add(demo)
    db.session.commit()

    db.session.add(girl_power)
    db.session.commit()

    db.session.add(chill_teacher)
    db.session.commit()

    db.session.add(awesome_ta)
    db.session.commit()

    db.session.add(user5)
    db.session.commit()

    db.session.add(user6)
    db.session.commit()

    db.session.add(user7)
    db.session.commit()

    db.session.add(user8)
    db.session.commit()

    db.session.add(user9)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

def seed_stores():
    demo_store = Store(
        user_id=1,
        name="Demo Store",
        about="This is a demo store. Have a look around and test out the site features!")
    cute_coding = Store(
        user_id=2,
        name="Cute Coding",
        about="In software development, us women are underrepresented so I set out to craft cute and feminine merchandise just for YOU! Women code too!",
        cover_image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1670541639/Stories%20%2B%20Stickers/Cute%20Coding/NEW_STORY_COMING_SOON..._1_m5pchv.png",
        profile_image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537978/Stories%20%2B%20Stickers/Cute%20Coding/cute_coding_profile_pic_rz5htw.png")
    chill_shop = Store(
        user_id=3,
        name="Chill Shop",
        about="Software Developer life is constantly evolving so I evolved with it. Fast food restaurants are empowering me to never have to cook a single meal ever again! I made some super dope stickers to celebrate.",
        cover_image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1670275729/Stories%20%2B%20Stickers/Chill%20Shop/chill_banner_mindut.png",
        profile_image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668538061/Stories%20%2B%20Stickers/Chill%20Shop/Copy_of_Untitled_Design_1_rr5ioc.png")
    vampires_and_code = Store(
        user_id=4,
        name="Vampires + Code",
        about="Hey, I'm a coder (and secretly a vampire). If you are too, or just hate the daytime, you've come to the right shop!",
        cover_image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1670275995/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/Into_shadows_banner_ybjmxv.png",
        profile_image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668538056/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/Copy_of_Untitled_Design_pgdhc5.png")

    db.session.add(demo_store)
    db.session.commit()

    db.session.add(cute_coding)
    db.session.commit()

    db.session.add(chill_shop)
    db.session.commit()

    db.session.add(vampires_and_code)
    db.session.commit()

def undo_stores():
    db.session.execute('TRUNCATE stores RESTART IDENTITY CASCADE;')
    db.session.commit()


def seed_items():
    item1 = Item(
        name="Chipotle Streak Sticker",
        description="Chipotle fanatics will love this sticker's not so subtle nod to the amazingness of the value you can get at this fast food staple",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668539506/Stories%20%2B%20Stickers/Chill%20Shop/Chipotle_Streak_x0vfg5.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537661/Stories%20%2B%20Stickers/Chill%20Shop/1668452929078_nx0iqp.png",
        content_type='sticker',
        store_id=3)
    item2 = Item(
        name="Baylen's Checklist Sticker",
        description="This sticker is the embodiment of: I've moved onto bigger better things than teaching, but my students will always have a special place in my heart",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668539496/Stories%20%2B%20Stickers/Chill%20Shop/BAYLEN_S_CHECKLIST_hgy9vg.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537692/Stories%20%2B%20Stickers/Chill%20Shop/1668309872004_zjgurd.png",
        content_type='sticker',
        store_id=3)
    item3 = Item(
        name="Classic NOICE Sticker",
        description="This classic Baylen sticker is a must have for any 2022 January Cohort student",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668539499/Stories%20%2B%20Stickers/Chill%20Shop/h1_sjhiwa.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537633/Stories%20%2B%20Stickers/Chill%20Shop/1668311374457_gr8mfx.png",
        content_type='sticker',
        store_id=3)
    item4 = Item(
        name="Funny Hey Hensell Sticker",
        description="The laughter and shenanigans that are symbolized within the simple phase on this sticker will make any 2022 January Cohort student smile",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1671070933/Stories%20%2B%20Stickers/Chill%20Shop/Hey_what_s_up_Henzel_1_jbu2uq.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537655/Stories%20%2B%20Stickers/Chill%20Shop/1668312024529_kz0hlx.png",
        content_type='sticker',
        store_id=3)
    item5 = Item(
        name="Starbucks Music Sticker",
        description="This sticker excels at capturing the great Starbucks music that many budding developers listen to and how it can be unheard on zoom due to the power of windscreens",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668539492/Stories%20%2B%20Stickers/Chill%20Shop/Starbucks_Music_bfx6co.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537686/Stories%20%2B%20Stickers/Chill%20Shop/1668308937536_mg6fad.png",
        content_type='sticker',
        store_id=3)
    item6 = Item(
        name="Men Cry Too Sticker",
        description="This sticker is for the ones who don't shy away from watching the likes of The Fault in Our Stars and Bridge to Terabithia",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668553925/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/men_fchlr4.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537733/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/1668481158056_ngu6bc.png",
        content_type='sticker',
        store_id=4)
    item7 = Item(
        name="Man in the Shadows Sticker",
        description="This sticker is for those out there who hate light bulbs, sunlight, and any other form of light except that of an electronic device",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668553919/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/MAN_iwvehm.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537740/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/1668480907579_kk9shu.png",
        content_type='sticker',
        store_id=4)
    item8 = Item(
        name="Panda Express Sticker",
        description="This sticker is a throwback to when I was a tiny coding Padawan and one of my peers insisted on always going to Panda Express",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668553922/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/express_jbvn2l.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537710/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/1668481076098_gxsyrm.png",
        content_type='sticker',
        store_id=4)
    item9 = Item(
        name="Hacking Sticker",
        description="Shh! Don't tell anyone! Jk, I don't care. This sticker is a reminder that hacking can be done ethically. So just be responsible kids!",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668553916/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/HACKING_qyvbn0.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537727/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/1668480762994_lidjkq.png",
        content_type='sticker',
        store_id=4)
    item10 = Item(
        name="Night Mode All Day Sticker",
        description="This sticker is for anyone who hates light mode and the blinding white space that accompanies it more than sunlight itself",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668553928/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/NIGHT_MODE_ALL_DAY_xwxufs.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537716/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/1668479896867_wadqtd.png",
        content_type='sticker',
        store_id=4)
    item11 = Item(
        name="Saturday Class Marathon Sticker",
        description="A rocking App Academy sticker for a reminder of all your hard work during those long Saturday classes. You're killing it!",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668554436/Stories%20%2B%20Stickers/Cute%20Coding/Saturday_Marathon_ttignr.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537604/Stories%20%2B%20Stickers/Cute%20Coding/1668480197132_xiw6ny.png",
        content_type='sticker',
        store_id=2)
    item12 = Item(
        name="Winter Break HTML Sticker",
        description="A festive code-themed sticker for those who enjoy the holiday season and its classic décor",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668575294/Stories%20%2B%20Stickers/Cute%20Coding/App_Academy_2_dieaci.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668645108/Stories%20%2B%20Stickers/Cute%20Coding/1668575836646_jloamg.png", 
        content_type='sticker',
        store_id=2)
    item13 = Item(
        name="Night Themed App Academy Part Time Sticker",
        description="A cute night themed sticker as a nod to all the night classes taken during the App Academy part time program",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668554438/Stories%20%2B%20Stickers/Cute%20Coding/Copy_of_Your_paragraph_text_onumnn.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537608/Stories%20%2B%20Stickers/Cute%20Coding/1668480358869_hg2ssu.png",
        content_type='sticker',
        store_id=2)
    item14 = Item(
        name="Women Code Sticker",
        description="An empowering and 'flowery' affirmation sticker for female coders everywhere",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668554444/Stories%20%2B%20Stickers/Cute%20Coding/Women_Code_jk41cy.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537613/Stories%20%2B%20Stickers/Cute%20Coding/1668481244602_oycft1.png",
        content_type='sticker',
        store_id=2)
    item15 = Item(
        name="Cute App Academy Sticker",
        description="This cutesy App Academy sticker encompasses the love of designing beautiful web applications",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668554473/Stories%20%2B%20Stickers/Cute%20Coding/App_Academy_1_qvp8vv.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668537624/Stories%20%2B%20Stickers/Cute%20Coding/1668481352819_dryugv.png",
        content_type='sticker',
        store_id=2)
    item16 = Item(
        name="Demo Story",
        description="A PDF that has demo text in it",
        price=2.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668556479/Stories%20%2B%20Stickers/Demo/test-story_cshgio.png",
        content="https://docs.google.com/document/d/1FR3fvibNIaP_d4D2OicQ-JVAVhw7PJJuoA8Yw_9yNeY/edit?usp=sharing",
        content_type='story',
        store_id=1)
    item17 = Item(
        name="Cinderella Demo Story",
        description="A PDF that has demo text regarding Cinderella",
        price=2.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668556434/Stories%20%2B%20Stickers/Cute%20Coding/one-more-cinderella-story_qsq3tl.png",
        content="https://docs.google.com/document/d/1fOKXwiqrPAa1mOyrbaGUA-LTQlnFsnVyTWu9R4IKdPg/edit?usp=sharing",
        content_type='story',
        store_id=1)
    item18 = Item(
        name="Demo Sticker GRAY",
        description="A demo PNG digital sticker in the color gray",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668557208/Stories%20%2B%20Stickers/Demo/DEMO_STICKER_opcrqr.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668557266/Stories%20%2B%20Stickers/Demo/1668557112852_uqfq9w.png",
        content_type='sticker',
        store_id=1)
    item19 = Item(
        name="Demo Sticker BLUE",
        description="A demo PNG digital sticker in the color blue",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668623009/Stories%20%2B%20Stickers/Demo/DEMO_STICKER_BLUE_1_o2aqlw.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668642288/Stories%20%2B%20Stickers/Demo/1668642120625_itluzv.png",
        content_type='sticker',
        store_id=1)
    item20 = Item(
        name="Demo Sticker RED",
        description="A demo PNG digital sticker in the color red",
        price=0.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668623016/Stories%20%2B%20Stickers/Demo/DEMO_STICKER_RED_qkzwt1.png",
        content="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668642292/Stories%20%2B%20Stickers/Demo/1668642209149_mbgkdf.png",
        content_type='sticker',
        store_id=1)
    item21 = Item(
        name="Join Couple on Mardi Gras Short Story",
        description="A one page, urban fantasy about a woman named Stella who skips class for a day to go spend time with her husband (and some dragons) on Mardi Gras",
        price=1.99,
        image_url="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668622162/Stories%20%2B%20Stickers/Cute%20Coding/Cute_Coding_2_oslsth.png",
        content="https://docs.google.com/document/d/1jc5uTkHGVLuIO8VNpSmLPQGbJn5JjwcqknUk54gZpzM/edit?usp=sharing",
        content_type='story',
        store_id=2)
    
  
    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    db.session.add(item7)
    db.session.add(item8)
    db.session.add(item9)
    db.session.add(item10)
    db.session.add(item11)
    db.session.add(item12)
    db.session.add(item13)
    db.session.add(item14)
    db.session.add(item15)
    db.session.add(item16)
    db.session.add(item17)
    db.session.add(item18)
    db.session.add(item19)
    db.session.add(item20)
    db.session.add(item21)
   
    db.session.commit()

def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()


def seed_reviews():
    #user6
    review1 = Review(
        user_id=6, content='I like this!', star_rating=4, item_id=11, store_id=2)
    review2 = Review(
        user_id=6, content='I adore this!', star_rating=5, item_id=12, store_id=2)
    review3 = Review(
        user_id=6, content='Love it!', star_rating=5, item_id=13, store_id=2)
    review4 = Review(
        user_id=6, content='So cool!', star_rating=4, item_id=14, store_id=2)
    review5 = Review(
        user_id=6, content='Totally amazing! Bought everything in the store! Excited for my Zazzle hoodie to come!', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569425/Stories%20%2B%20Stickers/Cute%20Coding/cute-aa-hoodie_dtbbar.png", item_id=15, store_id=2)
    review6 = Review(
        user_id=6, content='How have I lived without this?', star_rating=5, item_id=21, store_id=2)

    review7 = Review(
        user_id=6, content='So chill', star_rating=4, item_id=1, store_id=3)
    review8 = Review(
        user_id=6, content='Love this sticker!', star_rating=5, item_id=2, store_id=3)
    review9 = Review(
        user_id=6, content='Perfection in a sticker', star_rating=5, item_id=5, store_id=3)
    review10 = Review(
        user_id=6, content='I bought them all. Stoked for my Zazzle mug to come in the mail.', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569376/Stories%20%2B%20Stickers/Chill%20Shop/noice-mug_tntxnk.png", item_id=3, store_id=3)

    review11 = Review(
        user_id=6, content='Darkness is the best!', star_rating=5, item_id=7, store_id=4)
    review12 = Review(
        user_id=6, content='Sticker goodness', star_rating=4, item_id=10, store_id=4)
    review13 = Review(
        user_id=6, content='Like it', star_rating=4, item_id=6, store_id=4)
    review14 = Review(
        user_id=6, content='Shadows are the best', star_rating=5, item_id=8, store_id=4)
    review15 = Review(
        user_id=6, content='Grabbed all these stickers. Integrated them with Canva without a hitch!', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569034/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/canva-for-review_vinxjj.png", item_id=9, store_id=4)


    #user7
    review16 = Review(
        user_id=7, content='So cute!', star_rating=4, item_id=11, store_id=2)
    review17 = Review(
        user_id=7, content='Adorable!', star_rating=5, item_id=12, store_id=2)
    review18 = Review(
        user_id=7, content='Sweet!', star_rating=5, item_id=21, store_id=2)
    review19 = Review(
        user_id=7, content='Wonderful!', star_rating=4, item_id=13, store_id=2)
    review20 = Review(
        user_id=7, content='Just great! I got the whole Cute Coding collection and love how the stickers integrated with my digital planner.', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1671248539/Stories%20%2B%20Stickers/Cute%20Coding/digital-planner-screenshot_dgsvx7.png", item_id=14, store_id=2)
    review21 = Review(
        user_id=7, content='How is it possible for a sticker to be this cute?!', star_rating=5, item_id=15, store_id=2)
    
    review22 = Review(
        user_id=7, content='Perfect for my friend', star_rating=5, item_id=6, store_id=4)
    review23 = Review(
        user_id=7, content='Bought for a friend', star_rating=4, item_id=7, store_id=4)
    review24 = Review(
        user_id=7, content='Cool', star_rating=4, item_id=8, store_id=4)
    review25 = Review(
        user_id=7, content='Grabbed a bunch of these for a friend and hopped over to Zazzle to make him a t-shirt. He said it was his favorite birthday gift!', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569022/Stories%20%2B%20Stickers/Vampires%20%2B%20Code/night-mode-t-shirt_n3kdja.png", item_id=10, store_id=4)


    #user9
    review26 = Review(
        user_id=9, content='Just what I have been looking for!', star_rating=5, item_id=21, store_id=2)
    review27 = Review(
        user_id=9, content='Pretty', star_rating=4, item_id=12, store_id=2)
    review28 = Review(
        user_id=9, content='Really like Cute Coding stickers. Looking forward to getting my Zazzle mug for Christmas.', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569458/Stories%20%2B%20Stickers/Cute%20Coding/part-time-mug_nofkzn.png", item_id=13, store_id=2)
    review29 = Review(
        user_id=9, content='Gosh, I adore these designs', star_rating=5, item_id=15, store_id=2)
    
    #user5
    review30 = Review(
        user_id=5, content='Love this store! Getting a Zazzle mug to treat myself after finishing my program!.', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569466/Stories%20%2B%20Stickers/Cute%20Coding/sat-marathon-mug_oejzvs.png", item_id=11, store_id=2)
    
    review31 = Review(
        user_id=5, content='Neat', star_rating=4, item_id=16, store_id=1)
    review32 = Review(
        user_id=5, content='Chill', star_rating=4, item_id=17, store_id=1)
    review33 = Review(
        user_id=5, content='Liked it', star_rating=4, item_id=18, store_id=1)
    review34 = Review(
        user_id=5, content='Good job', star_rating=5, item_id=19, store_id=1)
    review35 = Review(
        user_id=5, content='Cool', star_rating=4, item_id=20, store_id=1)

    review36 = Review(
        user_id=5, content='So chill. I love the vibes man. Totally sending Zazzle t-shirts with these stickers to all my friends for the holidays.', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1671071058/Stories%20%2B%20Stickers/Chill%20Shop/hensell-t-shirt_pba7h9.png", item_id=4, store_id=3)

    #user8
    review37 = Review(
        user_id=8, content='Such great stickers that I put one on a Zazzle t-shirt for my sister.', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569414/Stories%20%2B%20Stickers/Cute%20Coding/women-code-tshirt_xnja2d.png", item_id=14, store_id=2)
    
    review38 = Review(
        user_id=8, content='Lit', star_rating=5, item_id=16, store_id=1)
    review39 = Review(
        user_id=8, content='Simple + clean', star_rating=4, item_id=17, store_id=1)
    review40 = Review(
        user_id=8, content='Alright', star_rating=4, item_id=18, store_id=1)
    review41 = Review(
        user_id=8, content='Simply magical', star_rating=5, item_id=19, store_id=1)
    review42 = Review(
        user_id=8, content='Very cool', star_rating=4, item_id=20, store_id=1)

    review43 = Review(
        user_id=8, content='Perfect stickers to help spice up my Instagram feed!', star_rating=5, photo="https://res.cloudinary.com/dymmlu1dw/image/upload/v1668569090/Stories%20%2B%20Stickers/Chill%20Shop/foodie1234_r4hgt7.png", item_id=1, store_id=3)


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.add(review31)
    db.session.add(review32)
    db.session.add(review33)
    db.session.add(review34)
    db.session.add(review35)
    db.session.add(review36)
    db.session.add(review37)
    db.session.add(review38)
    db.session.add(review39)
    db.session.add(review40)
    db.session.add(review41)
    db.session.add(review42)
    db.session.add(review43)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
