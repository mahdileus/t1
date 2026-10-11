import { visuals } from "./motion";
import { Fragment } from "react";

export const androidData = {
    slug: "android",

    name: "Android",

    // رنگ‌ها + لوگوی سه‌بعدی + برچسب‌ها (theme و motion)
    ...visuals.android,

    hero: {
        badge: "توسعه اپلیکیشن اندروید",

        titleBefore: "اپلیکیشن‌های",
        highlightedTitle: "حرفه‌ای و Native اندروید",
        titleAfter: "طراحی و توسعه دهید",

        tags: [
            {
                title: "توسعه Native با Kotlin",
            },
            {
                title: "Jetpack Compose",
            },
        ],

        description: [
            <Fragment key="android-description-1">
                <strong className="font-medium text-white">Android</strong> محبوب‌ترین
                پلتفرم موبایل در جهان است. با توسعه Native اندروید و استفاده از Kotlin،
                Android Studio و Jetpack Compose می‌توانید اپلیکیشن‌هایی سریع، امن،
                مقیاس‌پذیر و کاملاً متناسب با نیازهای کسب‌وکار خود طراحی و پیاده‌سازی
                کنید.
            </Fragment>,

            <Fragment key="android-description-2">
                در این راهنما با برنامه‌نویسی مدرن اندروید، زبان Kotlin، معماری اپلیکیشن،
                Jetpack Compose، اتصال به API، مدیریت دیتابیس محلی، امنیت، مزایا و
                چالش‌های توسعه Native و مقایسه Android با Flutter و React Native آشنا
                می‌شوید.
            </Fragment>,
        ],

        actions: [
            {
                label: "سوالات متداول",
                href: "#faq",
            },
            {
                label: "مشاهده پروژه‌ها",
                href: "#projects",
            },
        ],
    },

    navigation: [
        {
            number: "01",
            title: "معرفی اندروید",
            description:
                "Android چیست و توسعه اپلیکیشن اندروید چگونه انجام می‌شود؟",
            href: "#introduction",
        },
        {
            number: "02",
            title: "معماری اپلیکیشن",
            description:
                "Kotlin، Jetpack Compose، MVVM و معماری تمیز در اندروید",
            href: "#architecture",
        },
        {
            number: "03",
            title: "کاربردهای اندروید",
            description:
                "اندروید برای چه نوع اپلیکیشن‌ها و کسب‌وکارهایی مناسب است؟",
            href: "#use-cases",
        },
        {
            number: "04",
            title: "مقایسه فناوری‌ها",
            description:
                "مقایسه Android Native با Flutter و React Native",
            href: "#comparison",
        },
        {
            number: "05",
            title: "هزینه توسعه",
            description:
                "هزینه طراحی و توسعه اپلیکیشن اندروید چگونه محاسبه می‌شود؟",
            href: "#cost",
        },
    ],

    introduction: {
        id: "introduction",

        eyebrow: "آشنایی با توسعه اندروید",

        title: "اندروید",
        titleSuffix: "چیست و توسعه اپلیکیشن Android چگونه انجام می‌شود؟",

        description:
            "اندروید یک سیستم‌عامل متن‌باز و مبتنی بر لینوکس است که توسط گوگل توسعه داده شده و امروزه روی میلیاردها گوشی هوشمند، تبلت، تلویزیون هوشمند، ساعت هوشمند و دستگاه‌های اینترنت اشیا اجرا می‌شود. این پلتفرم به دلیل انعطاف‌پذیری بالا، جامعه توسعه‌دهندگان بزرگ و دسترسی گسترده به سخت‌افزارهای مختلف، محبوب‌ترین سیستم‌عامل موبایل در جهان محسوب می‌شود.",

        overview: [
            ["زبان اصلی", "Kotlin"],
            ["محیط توسعه", "Android Studio"],
            ["رابط کاربری مدرن", "Jetpack Compose"],
            ["ابزار و API", "Android SDK"],
            ["سیستم Build", "Gradle"],
            ["معماری رایج", "MVVM / Clean Architecture"],
            ["مناسب برای", "اپلیکیشن‌های Native اندروید"],
        ],

        technologies: [
            {
                number: "01",
                title: "Kotlin",
                description:
                    "زبان رسمی و مدرن توسعه Native اندروید که توسط گوگل معرفی شده است. Kotlin با قابلیت‌هایی مانند ایمنی در برابر Null، پشتیبانی از Coroutines و سازگاری کامل با Java، کدنویسی را ساده‌تر، ایمن‌تر و خواناتر می‌کند.",
            },
            {
                number: "02",
                title: "Jetpack Compose",
                description:
                    "ابزار مدرن و Declarative برای ساخت رابط کاربری Native اندروید. با Compose می‌توان رابط‌های کاربری پیچیده را با کد کمتر، قابلیت نگهداری بالاتر و انیمیشن‌های روان پیاده‌سازی کرد.",
            },
            {
                number: "03",
                title: "Android Jetpack",
                description:
                    "مجموعه‌ای از کتابخانه‌های رسمی گوگل که شامل Lifecycle، Navigation، ViewModel، Room، DataStore و سایر ابزارهای کاربردی است و توسعه اپلیکیشن‌های پایدار و مقیاس‌پذیر را آسان‌تر می‌کند.",
            },
            {
                number: "04",
                title: "API و داده‌های محلی",
                description:
                    "امکان اتصال اپلیکیشن به سرور از طریق REST API و ذخیره و مدیریت داده‌های محلی با استفاده از Room و DataStore برای تجربه کاربری بهتر حتی در حالت آفلاین.",
            },
        ],
    },

    architecture: {
        id: "architecture",

        badge: "معماری و ساختار اپلیکیشن Android",

        title: "معماری اپلیکیشن",
        highlight: "اندروید",

        description:
            "معماری اپلیکیشن اندروید مشخص می‌کند رابط کاربری، منطق برنامه و منابع داده چگونه از یکدیگر جدا شوند و با هم ارتباط داشته باشند. در پروژه‌های مدرن Android معمولاً از ساختارهای لایه‌ای و الگوهایی مانند MVVM، Repository و معماری تمیز (Clean Architecture) استفاده می‌شود.",

        eyebrow: "ANDROID ARCHITECTURE",

        introTitle: "منظور از معماری اپلیکیشن اندروید چیست؟",

        paragraphs: [
            "معماری نرم‌افزار مشخص می‌کند بخش‌های مختلف اپلیکیشن چگونه سازمان‌دهی شوند، هر بخش چه مسئولیتی داشته باشد و اطلاعات چگونه میان رابط کاربری، منطق برنامه و منابع داده جریان پیدا کند.",

            "در یک اپلیکیشن مدرن Android، لایه UI مسئول نمایش اطلاعات و تعامل با کاربر، ViewModel مسئول مدیریت State و منطق مرتبط با رابط کاربری و لایه Data مسئول دریافت و ذخیره داده‌ها است.",

            "در پروژه‌های بزرگ‌تر معمولاً یک Domain Layer نیز میان UI و Data قرار می‌گیرد تا منطق کسب‌وکار و Use Caseهای پیچیده از سایر بخش‌های برنامه مستقل‌تر شوند.",
        ],

        note: {
            title: "یک نکته مهم",
            description:
                "MVVM تنها معماری ممکن برای Android نیست. انتخاب معماری به اندازه و پیچیدگی پروژه بستگی دارد. هدف اصلی، جداسازی مسئولیت‌ها و ایجاد ساختاری قابل تست، نگهداری و توسعه است.",
        },

        overviewTitle: "معماری Android در یک نگاه",

        overviewDescription:
            "لایه‌های متداول در معماری یک اپلیکیشن مدرن اندروید",

        overview: [
            {
                title: "UI Layer",
                description: "نمایش رابط کاربری و دریافت تعاملات کاربر",
            },
            {
                title: "ViewModel",
                description: "مدیریت State و منطق مرتبط با UI",
            },
            {
                title: "Domain Layer",
                description: "Use Caseها و منطق کسب‌وکار در پروژه‌های پیچیده",
            },
            {
                title: "Repository",
                description: "واسط میان منطق برنامه و منابع داده",
            },
            {
                title: "Data Sources",
                description: "API، Room، DataStore و سایر منابع داده",
            },
        ],

        layersTitle: "ساختار لایه‌ای در اندروید",

        layersDescription:
            "در معماری مدرن Android بهتر است مسئولیت‌های رابط کاربری، منطق برنامه و مدیریت داده از یکدیگر جدا شوند.",

        layers: [
            {
                icon: "U",
                title: "UI Layer",
                description:
                    "مسئول نمایش اطلاعات، دریافت تعاملات کاربر و نمایش State برنامه است.",
                items: [
                    "Jetpack Compose",
                    "Screens & Components",
                    "UI State",
                    "User Interaction",
                ],
            },
            {
                icon: "D",
                title: "Domain Layer",
                description:
                    "در پروژه‌های پیچیده، منطق کسب‌وکار و Use Caseها را از UI و منابع داده مستقل می‌کند.",
                items: [
                    "Use Cases",
                    "Business Rules",
                    "Domain Models",
                    "Reusable Logic",
                ],
            },
            {
                icon: "D",
                title: "Data Layer",
                description:
                    "مسئول مدیریت منابع اطلاعات، Repositoryها، API و داده‌های محلی است.",
                items: ["Repository", "REST API", "Room", "DataStore"],
            },
        ],

        flowTitle: "جریان اطلاعات در اپلیکیشن Android",

        flow: [
            {
                title: "User Interaction",
                description: "دریافت لمس، کلیک و تعامل کاربر",
            },
            {
                title: "UI Layer",
                description: "دریافت Event و نمایش State",
            },
            {
                title: "ViewModel",
                description: "مدیریت وضعیت و منطق UI",
            },
            {
                title: "Domain",
                description: "اجرای منطق و Use Case",
            },
            {
                title: "Data Layer",
                description: "دریافت اطلاعات از منابع داده",
            },
            {
                title: "UI Update",
                description: "نمایش State جدید به کاربر",
            },
        ],
    },

    useCases: {
        id: "use-cases",

        badge: "کاربردهای اندروید",

        title: "اندروید برای چه",
        highlight: "پروژه‌هایی مناسب است؟",

        description:
            "Android می‌تواند برای طیف گسترده‌ای از محصولات موبایلی، از اپلیکیشن‌های ساده تا سامانه‌های بزرگ متصل به Backend و سرویس‌های مختلف استفاده شود.",

        items: [
            {
                title: "اپلیکیشن فروشگاهی",
                tag: "E-COMMERCE",
                description:
                    "طراحی فروشگاه موبایلی با محصولات، دسته‌بندی، سبد خرید، حساب کاربری، سفارش و پرداخت آنلاین.",
                features: [
                    "سبد خرید",
                    "پرداخت آنلاین",
                    "حساب کاربری",
                    "Push Notification",
                ],
            },
            {
                title: "اپلیکیشن خدماتی",
                tag: "SERVICE",
                description:
                    "مناسب کسب‌وکارهایی که خدمات، درخواست، رزرو یا ارتباط میان مشتری و ارائه‌دهنده را مدیریت می‌کنند.",
                features: [
                    "ثبت درخواست",
                    "مدیریت سفارش",
                    "موقعیت مکانی",
                    "اعلان‌ها",
                ],
            },
            {
                title: "رزرو و نوبت‌دهی",
                tag: "BOOKING",
                description:
                    "برای کلینیک، سالن زیبایی، مجموعه‌های خدماتی، مشاوره و کسب‌وکارهای مبتنی بر زمان‌بندی.",
                features: ["تقویم", "رزرو آنلاین", "یادآوری", "پرداخت"],
            },
            {
                title: "حمل‌ونقل و موقعیت مکانی",
                tag: "LOCATION",
                description:
                    "اپلیکیشن‌هایی که به نقشه، GPS، موقعیت لحظه‌ای و سرویس‌های مسیریابی نیاز دارند.",
                features: [
                    "GPS",
                    "Maps",
                    "Tracking",
                    "Background Location",
                ],
            },
            {
                title: "اپلیکیشن آموزشی",
                tag: "EDUCATION",
                description:
                    "محصولات آموزشی شامل دوره، ویدئو، آزمون، پیگیری پیشرفت کاربر و محتوای اختصاصی.",
                features: ["Video", "Course", "Quiz", "User Progress"],
            },
            {
                title: "اپلیکیشن سازمانی",
                tag: "ENTERPRISE",
                description:
                    "سامانه‌های اختصاصی سازمان‌ها با نقش‌های مختلف، APIهای متعدد و منطق کسب‌وکار پیچیده.",
                features: [
                    "Role & Permission",
                    "REST API",
                    "Offline Data",
                    "امنیت بالا",
                ],
            },
        ],

        bottomNote: {
            title:
                "آیا Android فقط برای اپلیکیشن‌های موبایل ساده مناسب است؟",
            description:
                "خیر. با معماری مناسب می‌توان پروژه‌های بزرگ، چندماژوله و سازمانی Android را نیز توسعه داد. مقیاس‌پذیری نهایی به معماری اپلیکیشن، Backend، Database، API، Cache، امنیت و زیرساخت محصول وابسته است.",
        },
    },

    comparison: {
        id: "comparison",

        badge: "مقایسه فناوری‌های توسعه موبایل",

        title: "Android Native یا",
        highlight: "Flutter و React Native؟",

        description:
            "انتخاب فناوری توسعه اپلیکیشن باید بر اساس نیاز محصول، پلتفرم‌های هدف، Performance، دسترسی به قابلیت‌های دستگاه و برنامه توسعه آینده انجام شود.",

        cards: [
            {
                title: "Android Native",
                featured: true,
                description:
                    "توسعه اختصاصی برای Android با Kotlin و ابزارهای رسمی اکوسیستم گوگل.",
                items: [
                    "دسترسی کامل به Android API",
                    "Performance Native",
                    "Jetpack Compose",
                    "مناسب پروژه‌های Android محور",
                ],
            },
            {
                title: "Flutter",
                description:
                    "راهکار Cross Platform برای توسعه همزمان Android و iOS از یک Codebase.",
                items: [
                    "یک Codebase",
                    "Android و iOS",
                    "UI اختصاصی",
                    "اکوسیستم Flutter",
                ],
            },
            {
                title: "React Native",
                description:
                    "توسعه اپلیکیشن Cross Platform با اکوسیستم JavaScript و React.",
                items: [
                    "JavaScript / TypeScript",
                    "React Ecosystem",
                    "Cross Platform",
                    "Native Modules",
                ],
            },
        ],

        table: {
            headers: [
                "معیار",
                "Android Native",
                "Flutter",
                "React Native",
                "PWA",
            ],

            rows: [
                [
                    "پلتفرم هدف",
                    "Android",
                    "Android / iOS",
                    "Android / iOS",
                    "Browser",
                ],
                [
                    "زبان",
                    "Kotlin",
                    "Dart",
                    "JavaScript / TypeScript",
                    "Web Technologies",
                ],
                [
                    "Performance",
                    "بسیار بالا",
                    "بالا",
                    "بالا",
                    "وابسته به مرورگر",
                ],
                [
                    "دسترسی به Device API",
                    "کامل",
                    "از طریق Plugin",
                    "Native Modules",
                    "محدودتر",
                ],
                [
                    "UI",
                    "Jetpack Compose / Views",
                    "Flutter Widgets",
                    "React Native Components",
                    "HTML / CSS",
                ],
            ],
        },

        recommendation: {
            title: "چه زمانی Android Native انتخاب بهتری است؟",
            description:
                "اگر تمرکز اصلی محصول روی Android است و Performance، دسترسی کامل به قابلیت‌های سیستم، APIهای جدید Android و کنترل دقیق روی تجربه کاربری اهمیت بالایی دارد، توسعه Native با Kotlin می‌تواند بهترین انتخاب باشد.",
        },
    },

    cost: {
        id: "cost",

        badge: "هزینه طراحی اپلیکیشن اندروید",

        title: "هزینه توسعه",
        highlight: "اپلیکیشن Android",

        description:
            "هزینه طراحی اپلیکیشن اندروید عدد ثابتی نیست و به Scope پروژه، تعداد Screenها، امکانات، معماری، Backend، APIها و سطح کیفیت مورد انتظار بستگی دارد.",

        factorsTitle:
            "چه عواملی روی هزینه طراحی اپلیکیشن اندروید تأثیر دارند؟",

        factorsDescription:
            "قیمت توسعه Android فقط به تعداد صفحات وابسته نیست. معماری، امکانات، Backend، سرویس‌های خارجی، امنیت و سطح تست نیز نقش مهمی دارند.",

        factors: [
            {
                title: "نوع اپلیکیشن اندروید",
                description:
                    "اپلیکیشن شرکتی، فروشگاهی، خدماتی، آموزشی، حمل‌ونقل یا سازمانی از نظر حجم توسعه یکسان نیستند.",
            },
            {
                title: "تعداد Screenها و Navigation",
                description:
                    "تعداد Screenها، فرم‌ها، Dialogها، Bottom Sheetها، Tabها و مسیرهای Navigation روی حجم توسعه تأثیر مستقیم دارد.",
            },
            {
                title: "طراحی UI و تجربه کاربری",
                description:
                    "Design System، Dark Mode، Animation و Adaptive Layout می‌توانند زمان توسعه را افزایش دهند.",
            },
            {
                title: "Backend و پنل مدیریت",
                description:
                    "Backend، دیتابیس، API و پنل مدیریت در صورت نبود زیرساخت قبلی باید جداگانه توسعه داده شوند.",
            },
            {
                title: "ثبت‌نام و احراز هویت",
                description:
                    "OTP، رمز عبور، Token، نقش‌های کاربری و احراز هویت چندمرحله‌ای سطح متفاوتی از توسعه ایجاد می‌کنند.",
            },
            {
                title: "اتصال به API و سرویس‌ها",
                description:
                    "REST API، Authentication، Pagination، Upload، Cache و مدیریت خطا پیچیدگی Data Layer را افزایش می‌دهند.",
            },
            {
                title: "دیتابیس و حالت آفلاین",
                description:
                    "Room، Cache، Offline-First و Sync اطلاعات می‌توانند معماری پروژه را پیچیده‌تر کنند.",
            },
            {
                title: "قابلیت‌های سخت‌افزاری و سیستم",
                description:
                    "دوربین، GPS، Bluetooth، NFC، فایل‌ها و سنسورها نیازمند Permission و تست مناسب هستند.",
            },
            {
                title: "تست، امنیت و Performance",
                description:
                    "تست، Android Keystore، HTTPS، Performance و بررسی دستگاه‌های مختلف بخشی از کیفیت نسخه نهایی هستند.",
            },
        ],

        complexityTitle:
            "سطح پیچیدگی پروژه چگونه هزینه اپلیکیشن اندروید را تغییر می‌دهد؟",

        complexityDescription:
            "پروژه‌ها را می‌توان برای درک بهتر Scope به‌صورت تقریبی در سه سطح دسته‌بندی کرد.",

        complexity: [
            {
                label: "BASIC",
                title: "اپلیکیشن ساده",
                description:
                    "مناسب پروژه‌هایی با تعداد Screen محدود و منطق ساده.",
                items: [
                    "تعداد محدود Screen",
                    "Navigation ساده",
                    "فرم‌های استاندارد",
                    "API محدود",
                    "ذخیره‌سازی ساده",
                ],
            },
            {
                label: "ADVANCED",
                featured: true,
                title: "اپلیکیشن متوسط و اختصاصی",
                description:
                    "مناسب محصولات واقعی کسب‌وکار با Backend و قابلیت‌های اختصاصی.",
                items: [
                    "Screen و Flow متعدد",
                    "ثبت‌نام و احراز هویت",
                    "REST API",
                    "Room و Cache",
                    "پرداخت، نقشه یا Push",
                ],
            },
            {
                label: "ENTERPRISE",
                title: "اپلیکیشن پیچیده و سازمانی",
                description:
                    "مناسب سامانه‌های بزرگ با کاربران و ماژول‌های متعدد.",
                items: [
                    "معماری ماژولار",
                    "چندین API",
                    "Role و Permission",
                    "Offline Sync",
                    "امنیت و مانیتورینگ",
                ],
            },
        ],

        additionalTitle:
            "آیا هزینه اپلیکیشن اندروید فقط شامل برنامه‌نویسی است؟",

        additionalDescription:
            "خیر. محصول واقعی ممکن است علاوه بر اپلیکیشن Android به Backend، سرور، دیتابیس، پیامک، Push Notification و سرویس‌های دیگر نیاز داشته باشد.",

        additionalNote:
            "برخی از این موارد هزینه مستقیم Android نیستند و جزو هزینه زیرساخت و بهره‌برداری محصول محسوب می‌شوند.",

        additionalCosts: [
            {
                title: "Backend و سرور",
                description: "Backend، API، دیتابیس و زیرساخت سرور.",
            },
            {
                title: "پنل مدیریت",
                description: "مدیریت کاربران، محصولات، سفارش‌ها و گزارش‌ها.",
            },
            {
                title: "پیامک و اعلان",
                description: "OTP، پیامک تراکنشی و Push Notification.",
            },
            {
                title: "سرویس‌های Third-Party",
                description: "نقشه، پرداخت، Storage و سرویس‌های خارجی.",
            },
            {
                title: "نگهداری و پشتیبانی",
                description: "Bug Fix، Update، Performance و سازگاری.",
            },
            {
                title: "نسخه‌های آینده",
                description: "قابلیت‌های جدید و توسعه فازهای بعدی محصول.",
            },
        ],

        estimationTitle:
            "هزینه طراحی اپلیکیشن اندروید چگونه برآورد می‌شود؟",

        estimationDescription:
            "برای قیمت‌گذاری دقیق ابتدا Scope و نیازهای واقعی محصول مشخص می‌شود.",

        estimation: [
            {
                title: "نیازسنجی",
                description: "بررسی هدف و کاربران محصول",
            },
            {
                title: "تعریف Scope",
                description: "Screenها و قابلیت‌ها",
            },
            {
                title: "معماری",
                description: "Backend، API و ساختار فنی",
            },
            {
                title: "برآورد توسعه",
                description: "زمان طراحی و برنامه‌نویسی",
            },
            {
                title: "تست و انتشار",
                description: "QA، Release و تحویل",
            },
        ],
    },

    faqDescription:
        "پاسخ به سوالات متداول درباره برنامه‌نویسی، معماری، هزینه و مراحل طراحی اپلیکیشن اندروید.",

    faq: [
        {
            question:
                "برای طراحی اپلیکیشن اندروید از چه زبان و ابزارهایی استفاده می‌شود؟",

            answer: [
                "برای توسعه Native مدرن Android معمولاً از Kotlin به‌عنوان زبان اصلی و Android Studio به‌عنوان محیط توسعه استفاده می‌شود.",

                "برای رابط کاربری نیز Jetpack Compose یکی از ابزارهای مدرن و توصیه‌شده Android است. بسته به پروژه، سیستم View مبتنی بر XML نیز همچنان قابل استفاده است.",

                "Android SDK، Gradle و کتابخانه‌های Jetpack نیز بخش مهمی از اکوسیستم توسعه Android هستند.",
            ],

            highlights: [
                {
                    label: "Language",
                    value: "Kotlin",
                },
                {
                    label: "IDE",
                    value: "Android Studio",
                },
                {
                    label: "UI",
                    value: "Jetpack Compose",
                },
            ],
        },

        {
            question: "Android Native بهتر است یا Flutter و React Native؟",

            answer: [
                "پاسخ به نیاز محصول بستگی دارد. Android Native برای پروژه‌هایی که تمرکز اصلی آن‌ها Android است و دسترسی کامل به APIهای سیستم و Performance اهمیت زیادی دارد، گزینه مناسبی است.",

                "Flutter و React Native زمانی می‌توانند مناسب باشند که توسعه چندپلتفرمی از یک Codebase یکی از اولویت‌های اصلی پروژه باشد.",
            ],
        },

        {
            question:
                "آیا Android برای اپلیکیشن‌های بزرگ و مقیاس‌پذیر مناسب است؟",

            answer: [
                "بله. می‌توان اپلیکیشن‌های بزرگ و چندماژوله Android را توسعه داد؛ اما مقیاس‌پذیری بیشتر از آنکه به نام Android وابسته باشد، به کیفیت معماری و نحوه پیاده‌سازی نرم‌افزار وابسته است.",

                "در پروژه‌های بزرگ جداسازی مسئولیت‌ها بین UI Layer و Data Layer، مدیریت State، ساختار ماژولار، Dependency Injection و تست‌پذیری اهمیت بیشتری پیدا می‌کند.",

                "Backend، Database، API، Cache، شبکه و امنیت نیز در ظرفیت و عملکرد نهایی سیستم نقش مهمی دارند.",
            ],

            highlights: [
                {
                    label: "Architecture",
                    value: "Modular Design",
                },
                {
                    label: "State",
                    value: "ViewModel / Flow",
                },
                {
                    label: "Data",
                    value: "API / Room",
                },
            ],
        },

        {
            question: "هزینه و زمان طراحی اپلیکیشن اندروید چقدر است؟",

            answer: [
                "هزینه و زمان توسعه اپلیکیشن Android عدد ثابتی ندارد. برای برآورد مناسب ابتدا باید Scope، تعداد Screenها، User Flowها و قابلیت‌های محصول مشخص شوند.",

                "طراحی UI/UX، Backend، ثبت‌نام، پرداخت، Push Notification، نقشه، GPS، دوربین، Bluetooth، NFC، دیتابیس محلی و حالت offline از عوامل مؤثر بر هزینه هستند.",

                "کیفیت معماری، تست، Performance و آماده‌سازی نسخه Release نیز روی زمان توسعه اثر می‌گذارند.",
            ],

            note: {
                title: "برای برآورد دقیق",
                description:
                    "ابتدا Screenها، قابلیت‌ها، APIها، Backend، امکانات دستگاه، امنیت و نسخه‌های Android مورد پشتیبانی مشخص می‌شوند؛ سپس زمان طراحی، توسعه، تست و انتشار برآورد می‌شود.",
            },
        },

        {
            question: "مراحل طراحی و توسعه اپلیکیشن اندروید چیست؟",

            answer: [
                "در مرحله اول هدف محصول، کاربران و قابلیت‌های اصلی مشخص می‌شوند.",

                "سپس Screenها، User Flow، Backend، API، پرداخت، اعلان‌ها، نقشه و سایر نیازهای محصول بررسی می‌شوند.",

                "بعد از مشخص شدن UI/UX و معماری فنی، توسعه Native با Kotlin و ابزارهای Android انجام می‌شود.",

                "در پایان اپلیکیشن تست و بهینه‌سازی شده و نسخه APK یا Android App Bundle برای انتشار آماده می‌شود.",
            ],

            highlights: [
                {
                    label: "01",
                    value: "نیازسنجی",
                },
                {
                    label: "02",
                    value: "UI / UX",
                },
                {
                    label: "03",
                    value: "Architecture",
                },
                {
                    label: "04",
                    value: "Development",
                },
                {
                    label: "05",
                    value: "تست و انتشار",
                },
            ],
        },
    ],
};