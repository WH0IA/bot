const TelegramApi = require('node-telegram-bot-api')

const token = '5057479971:AAGfRmHycEhBw8pEHNIZv81Ayifws3qXZZI'

const bot = new TelegramApi(token ,{polling:true})

const http = require('http')


const chats = {}

const dataQuest = [
  {
    id:1,
    questionS: 'пит',
    questionL:'Происхождение и трактовка термина «логистика». Эволюция логистики.',
    answer:'Большинство исследований сходятся на том, что происхождение слова «логистика» восходит в Древней Греции (счетное искусство, искусство рассуждения). Только в начале 50-ых годов 20-ого столетия термин «логистика» стал применяться в бизнесе. Определение логистики трактует её как учение о планировании, управлении и контроле движения материальных, информационных и финансовых ресурсов в различных системах. Эволюция современной логистики: Этап фрагментации или «дологистический этап» (20-е – 50-е годы); Этап становления логистики или «фаза физического распределения» (50-е – 70-е годы); Этап развития логистики (1970-е – 80-е годы); Этап интеграции логистики (90-е годы); Этап глобализации логистики (начало XXI века).'
  },
  {
    id:2,
    questionS: 'пко',
    questionL:'Подходы к определению логистики. Цели и задачи логистики.',
    answer:'В определении логистики выделяют два направления. Первое связано с функциональным подходом к товародвижению, то есть к логистике относят управление физическими операциями, выполняемыми при движении материального потока. Второе направление характеризуется более широким подходом. Среди задач логистики можно выделить: управление товарными потоками; развитие системы управления потоками товаров, услуг и информации; мониторинг рынка и выявление спроса на материалы и товары, прогнозирование будущей ситуации на рынке.'
  },
  {
    id:3,
    questionS: 'оил',
    questionL:'Объекты исследования логистики. Логистические операции и функции.',
    answer:'Таким образом, основными объектами исследований в логистике являются поток (материальный, человеческий, информационный, финансовый и т. д.), логистическая операция, логистическая цепь, логистическая функция, запасы, логистические издержки, логистическая система. Логистические операции - самостоятельная часть логистического процесса, выполняемая на одном рабочем месте и/или с помощью одного технического устройства. К основным логистическим функциям относят планирование материального обеспечения производства, управление ходом выполнения производственных заказов, управление запасами, управление распределением продукции.'
  },
  {
    id:4,
    questionS: 'ркв',
    questionL:'Распределительные каналы: виды, характеристика. Опишите последовательность ваших действий при создании логистической сбытовой цепи.',
    answer:'Канал распределения– это совокупность организаций или отдельных лиц, которые принимают на себя или помогают передать другому право собственности на конкретный товар или услугу на пути от производителя к потребителю. Виды: Прямые - связаны с перемещением товаров и услуг от производителя к потребителю без участия посреднических организаций; Косвенные - связаны с перемещением товаров и услуг сначала от изготовителя к незнакомому участнику - посреднику, а затем от него - к потребителю; Смешанные - объединяют черты прямых и косвенных каналов товародвижения. Действия при создании лог сбыт цепи: 1 фаза – организационная – заключается в анализе действующей и проектировании желаемой сбытовой логистической цепи; 1 стадия – предпроектная подготовка; 2 стадия – проектирование; 2 фаза – эксплуатационная – заключается в управлении сформированной сбытовой логистической цепью.'
  },
  {
    id:5,
    questionS: 'сир',
    questionL:'Сущность и роль товарно-материальных запасов в логистике. Функции запасов. Виды запасов.',
    answer:'В логистической системе современного предприятия товарные запасы играют роль решающего фактора, который влияет на конечные результаты деятельности любого предприятия, фирмы, при этом обеспечивая устойчивость их функционирования в условиях конкурентной среды. Виды: сырье и материалы, продовольствие; производственные запасы (запасы незавершенного производства) и комплектующие; готовую продукцию; вспомогательные материалы и т.п. Запасы выполняют три важнейших функции: функция накопления; функция защиты от изменения цен и инфляции; функция управления затратами.'
  },
  {
    id:6,
    questionS: 'кмп',
    questionL:'Классификация материальных потоков.',
    answer:'Материальные потоки классифицируют по следующим признакам: По отношению к логистической системе: внутренние материальные потоки, не выходящие за её пределы; внешние материальные потоки, поступающие в систему из внешней среды (входные) и выходящие из неё во внешнюю среду (выходные). По номенклатуре: однопродуктовые (простые), в которых имеется только один вид товаров; многопродуктовые (сложные), состоящих из нескольких видов продукции.'
  },
  {
    id:7,
    questionS: 'вкз',
    questionL:'Виды контроля за состоянием запасов. Управление запасами.',
    answer:'Управление запасами — это процесс прогнозирования, нормирования, планирования, организации, контроля, стимулирования и регулирования сроков и объемов выполнения заказов на восполнение нормы запасов в логистической системе. Виды контроля: Система оперативного управления — через определенный промежуток времени принимается оперативное решение: «заказывать» или «не заказывать», если заказывать, то какое количество единиц товара; Система пополнения запаса до максимального уровня — через равные промежутки времени заказывается партия, объем которой равен разности установленного максимального уровня запасов и фактического уровня запасов на момент проверки; Система с фиксированным размером заказа при периодической проверке фактического уровня запаса - фактический уровень запасов проверяется через равные промежутки времени.'
  },
  {
    id:8,
    questionS: 'псл',
    questionL:'Понятие сбытовой логистики, «Три золотых правила» сбытовой логистики. Сбыт и маркетинг - что объединяет данные понятие и в чем различие между ними?',
    answer:'Сбытовая логистика — это комплекс взаимосвязанных функций, реализуемых в процессе распределения вещественного и сопутствующих ему (информационного, денежного и сервисного) потоков между разными потребителями. "Три золотых правила" сбытовой логистики: 1. Лог сбыт цепь должна проникать как можно глубже к точкам конечного сбыта, использоваться как можно чаще и осуществлять транспортировку на как можно большее расстояние путем использования грузовых единиц продукции и грузовых транспортных единиц, обеспечивающих получение как можно больших вместимостей; 2. В ЛСЦ необходимо использовать минимальное количество транспортных единиц независимо от их вместимости; 3. Стационарный склад (если нельзя избежать его создания) должен располагаться в центре ЛСЦ: компромисс между близостью к исходному производственному процессу и к конечным торговым точкам.'
  },
  {
    id:9,
    questionS: 'олк',
    questionL:'Основные логистические концепции и системы: концепция «точно в срок» («just-in-time», JIT).',
    answer:'Концепциями в логистике являются: информационная; маркетинговая; интегральная. Логистические системы делятся на: 1) производственные, транспортные, складские, которые относятся к функциональным подсистемам; 2) информационные, правовые, кадровые, относящиеся к обеспечивающим подсистемам. Точно в срок— наиболее распространенная в мире логистическая концепция. Основная идея концепции заключается в следующем: если производственное расписание задано, то можно так организовать движение материальных потоков, что все материалы, компоненты и полуфабрикаты будут поступать в необходимом количестве, в нужное место и точно к назначенному сроку для производства, сборки или реализации готовой продукции.'
  },
  {
    id:10,
    questionS: 'лсв',
    questionL:'Логистическая система в макро - и микро-логистике. Логистические звенья, логистическая цепь.',
    answer:'Макрологистика решает вопросы управления материальными потоками, принадлежащими нескольким промышленным, торговым, транспортным предприятиям, расположенным в разных районах или странах. Микрологистика затрагивает локальные вопросы в рамках одного предприятия. Под логистической цепью понимают последовательность этапов прохождения материального потока от источника сырья до потребления готовой продукции. Логистическая цепь состоит из звеньев. Основные звенья логистической цепи включают: поставку сырья, материалов, полуфабрикатов; хранение сырья и продукции; производство товаров; отправку товаров со складов готовой продукции потребителю и др.'
  },
  {
    id:11,
    questionS: 'ому',
    questionL:'Основные модели управления запасами.',
    answer:'К наиболее популярным и эффективным можно отнести 2 основные модели управления запасами, это: Модель оптимальной партии заказа предполагает непрерывный контроль уровня запасов и периодическое размещение одинаковых по объему заказов, которые производятся в тот момент, когда уровень товарного запаса достигает некоторого минимума; Модель управления запасами с фиксированным интервалом времени между заказами предполагает контроль через равные временные промежутки.'
  },
  {
    id:12,
    questionS: 'олк',
    questionL:'Основные логистические концепции и системы: концепция «точно в срок» («just-in-time», JIT).',
    answer:'Концепциями в логистике являются: информационная; маркетинговая; интегральная. Логистические системы делятся на: 1) производственные, транспортные, складские, которые относятся к функциональным подсистемам; 2) информационные, правовые, кадровые, относящиеся к обеспечивающим подсистемам. Точно в срок— наиболее распространенная в мире логистическая концепция. Основная идея концепции заключается в следующем: если производственное расписание задано, то можно так организовать движение материальных потоков, что все материалы, компоненты и полуфабрикаты будут поступать в необходимом количестве, в нужное место и точно к назначенному сроку для производства, сборки или реализации готовой продукции.'
  },
  {
    id:13,
    questionS: 'олк',
    questionL:'Основные логистические концепции и системы: концепция «планирование потребностей/ресурсов» (requirements resource planning, RP). MRP-системы.',
    answer:'Логистическая концепция «планирования потребностей-ресурсов предусматривает синхронизацию процессов доставки запасов, формирующих материальный поток, по инициативе предшествующих логистических звеньев в четком соответствии с планом (графиком) их поставки последующим звеньям логистической цепи. Система MRP –система централизованного управления «выталкивающего» типа, планирующая наличие необходимых компонентов продукции в нужном месте в установленном время и в требуемом количестве для наиболее полного удовлетворения зависимого спроса на них, а следовательно, и независимого рыночного спроса на готовую продукцию.'
  },
  {
    id:14,
    questionS: 'знс',
    questionL:'Затраты на содержание запасов.',
    answer:'Расходы на содержание запасов определяются затратами на хранение материалов и самим фактом наличия запасов. В эту группу расходов входят такие статьи затрат, как возможный процент на капитал, вложенный в запасы; расходы на складские операции и плата за использование или аренду склада; текущие расходы на содержание складов, принадлежащих производственной единице; издержки, связанные с риском порчи и морального старения материалов, а также страховые и налоговые издержки.'
  },
  {
    id:15,
    questionS: 'ому',
    questionL:'Основные модели управления запасами: модель управления запасами по минимуму-максимуму и с постоянной периодичностью пополнения запасов.',
    answer:'Эта система содержит в себе элементы основных систем управления запасами. Заказы производятся не через каждый заданный интервал времени, а только при условии, что запасы на складе в этот момент оказались равными или меньше установленного минимального уровня. В случае выдачи размер рассчитывается так, чтобы поставка пополнила запасы до максимального желательного уровня. Таким образом, данная система работает лишь с двумя уровнями запасов — минимальным и максимальным.'
  },
  {
    id:16,
    questionS: 'лси',
    questionL:'Логистика снабжения и её место в логистической системе.',
    answer:'Логистика снабжения — это область логистики, контролирующая материальные и информационные потоки, включающая в себя систему снабжения предприятия, от сбора информации и осуществления процесса закупа необходимых товарно-материальных ценностей, до размещения их на складе предприятия в необходимом количестве, нужного качества, оптимальной стоимости, с необходимой информацией. Логистика снабжения занимает важное место в логистической системе. Она является первым звеном, основной целью которого является управление услугами и материальными потоками в процессе обеспечения организации этих материальных ресурсов и услуг.'
  },
  {
    id:17,
    questionS: 'рим',
    questionL:'Роль и место складирования в логистической системе. Содержание технологического процесса на складе.',
    answer:'Складирование как логистическая функция играет важную роль в обеспечении сохранности и ценности материалов и продукции. Складские структуры осуществляют хранение сырья, покупных полуфабрикатов, материалов, деталей, узлов и готовой продукции на всех этапах воспроизводственного процесса: в месте их производства, распределения и потребления. Содержание технологического процесса на складе: 1. Поступление и приемка товаров на склад по количеству и качеству. 2. Размещение и хранение товаров на складе. 3. Отпрака, 4. Отгрузка.'
  },
  {
    id:18,
    questionS: 'лсм',
    questionL:'Логистика снабжения: материальные ресурсы, их виды. Виды закупок.',
    answer:'Материальные ресурсы, находящиеся в логистических каналах от поставщиков до товаропроизводителей, являются запасами в снабжении, которые предназначены для обеспечения производственного процесса. Виды: основные (сырье и материалы); Вспомогательные; Полуфабрикаты; комплектующие изделия; готовая продукция; топливо и энергия; тарные материалы и тара; хозяйственные принадлежности и инвентарь; спецодежда и спецоснастка. Существует два основных способа закупочной логистики: традиционный и оперативный способы. Традиционный способ заключается в поставке необходимого количества товаров единовременно, а оперативный – в поставке товаров по мере необходимости в товаре. Самая важная часть закупочной логистики- это планирование поставок товара на основании управления запасами.'
  },
  {
    id:19,
    questionS: 'сок',
    questionL:'Склад: определение. Классификация складов. Функции складов.',
    answer:'Склад — территория, помещение, предназначенное для хранения материальных ценностей и оказания складских услуг. По назначению различают следующие виды складов: По условиям хранения различают склады общего назначения, резервуары, сейфы для опасных веществ, специализированные склады-хранилища (овощехранилища, фруктохранилища, склады - холодильники с машинным охлаждением, ледники для хранения продуктов, мультитемпературные склады и др.). К основным функциям склада можно отнести следующие: Создание необходимого ассортимента в соответствии с заказом потребителей; Складирование и хранение; Унитизация партий отгрузки и транспортировка грузов; Предоставление услуг.'
  },
  {
    id:20,
    questionS: 'оси',
    questionL:'Организация снабжения: инфраструктура снабжения; формы снабжения, преимущества и недостатки каждой.',
    answer:'Инфраструктура снабжения включает подразделения складского, транспортного, заготовительного хозяйств. Различают две формы снабжения: транзитная форма снабжения - предприятие получает сырье и материалы непосредственно от предприятий, их добывающих, обрабатывающих или производящих; складская форма снабжения - материальные ресурсы предприятие получает с баз и складов снабженческо-сбытовых организаций, оптовых и розничных торговых фирм.'
  },
  {
    id:21,
    questionS: 'опи',
    questionL:'Основные понятия и сущность производственной логистики.',
    answer:'Производственная логистика – это качественное, своевременное и комплексное производство продукции согласно заключенным хозяйственным договорам, а также сжатие производственного цикла и минимизация потраченных средств на производство. Сущностью логистики производственно-технологических процессов выступает упорядоченное движение материальных потоков на стадии производства продукции.'
  },
  {
    id:22,
    questionS: 'овэ',
    questionL:'Основные вопросы эффективного функционирования логистики складирования: выбор типа, количества и мощности складов.',
    answer:'Решающим условием при выборе одного из двух вариантов обычно является условие минимума затрат. У собственного склада более высокие постоянные затраты, но более низкие операционные затраты на единицу продукции, в то время как у складов общего пользования низкие постоянные затраты, но обычно более высокие переменные. Проектная мощность склада разрабатывается вместе с другими показателями при создании логистической системы. Фактическая мощность склада проявляется в конкретных реальных условиях функционирования системы хранения и переработки (склада). Под производственной мощностью склада понимается предельный объем продукции, который способно переработать складское предприятие в заданные сроки.'
  },
  {
    id:23,
    questionS: 'мфл',
    questionL:'Механизм функционирования логистики снабжения: выбор поставщиков.',
    answer:'Процедура получения и оценки предложений от потенциальных поставщиков может быть организована по-разному. Наиболее распространенными и эффективными являются: 1. Конкурсные торги - проводят в случае, если предполагается закупить сырье, материалы, комплектующие на большую денежную сумму или предполагается наладить долгосрочные связи между поставщиком и потребителем; 2. Письменные переговоры между поставщиком и потребителем - в процессе письменных переговоров потребитель получает официальное предложение на поставку товаров от потенциального поставщика.'
  },
  {
    id:24,
    questionS: 'овэ',
    questionL:'Основные вопросы эффективного функционирования логистики складирования: эффективное использование складских площадей, уменьшение числа операций с товаром, улучшение логистического обслуживания.',
    answer:'Эффективное использование площадей склада достигается при помощи назначения кода для мест хранения существенно облегчает отбор товара, а также дублируется в количественном складском учете. Применяются различные способы размещения товаров, которые обеспечивают эффективное использование складского помещения: номенклатурный, сортовой, комплектный, партионный, др. Управление логистического обслуживания играет ключевую роль в доставке товаров клиентам в соответствующее время, в соответствующем количестве и качестве. Благодаря эффективному перемещению товаров на склад и их размещению, а также точному выполнению заказов и быстрой подготовке к отправке управление грузопотоком имеет решающее значение для логистики распределения.'
  },
  {
    id:25,
    questionS: 'мфл',
    questionL:'Механизм функционирования логистики снабжения: размещение и отсылка заказа.',
    answer:'Анализ и выбор поставщика ведут к размещению заказа. Размещение заказа на закупку предусматривает заполнение формы заказа. Организации имеют свои формы заказа на закупку. Но в любой из них должны быть серийный номер, дата заполнения, название и адрес поставщика, описание заказанных товаров, количество, требуемая дата поставки, условия отгрузки, оплаты и заказа.'
  },
  {
    id:26,
    questionS: 'спп',
    questionL:'Структура производственного процесса.',
    answer:'Производственный процесс– совокупность всех действий людей и орудий труда, необходимых на данном предприятии для изготовления продукции. Структура производственного процесса – это состав его частей и их взаимосвязи по отношениям порядка следования или/и уровню вхождения. Структура производственного процесса: К основным процессам относят все операции, в результате которых изменяются форма и размеры предметов труда, их внутренние свойства, состояние поверхности и т.п; Вспомогательные процессы предназначены обеспечивать нормальное протекание основных процессов; Обслуживающие процессы включают контроль качества продукции и хода производственного процесса, транспортные и складские операции.'
  },
  {
    id:27,
    questionS: 'поп',
    questionL:'Принципы организации производственного процесса.',
    answer:'Принцип пропорциональности заключается в обеспечении относительно равной пропускной способности всех производственных подразделений цехов основного и вспомогательного производства, участков, линий, групп оборудования и рабочих мест на операциях. Принцип параллельности предполагает одновременное параллельное выполнение отдельных частей производственного процесса. Принцип непрерывности сопряжен с устранением различного рода перерывов при изготовлении каждого изделия. Принцип ритмичности предполагает выпуск одинакового или возрастающего количества продукции в равные промежутки времени и повторение через эти промежутки времени производственного процесса в тех же объемах.'
  },
  {
    id:28,
    questionS: 'ори',
    questionL:'Организация разгрузки и транспортировки товаров (грузов) к месту приёмки.',
    answer:'Поступивший транспорт с товарами должен быть в кратчайшие (нормативные) сроки разгружен и принят. Быстрота выполнения разгрузочных операций зависит от наличия и применения необходимого подъемнотранспортного оборудования (авто- и электропогрузчиков, грузовых тележек, и т. п.) и четкой организации работ по разгрузке транспорта.'
  },
  {
    id:29,
    questionS: 'вдм',
    questionL:'Виды движения материальных ресурсов в производстве. Типы производства',
    answer:' При последовательном виде движения каждая последующая операция начинается только после окончания изготовления всей партии предметов труда на предыдущей операции. Параллельно-последовательный способ заключается в разделении всей обрабатываемой партии на трансфертные (передаточные) партии. Подбор транспортных партий позволяет добиться непрерывности выполнения операций над партиями деталей, что обеспечивает возможность максимальной загрузки оборудования и рабочих. Параллельный вид движения материальных ресурсов заключается в том, что транспортные партии или отдельные детали передаются на следующие операции сразу после их обработки на данной операции, что исключает пролеживание деталей.'
  },
  {
    id:30,
    questionS: 'опт',
    questionL:'Организация приёмки товаров (грузов).',
    answer:'Эта процедура основана на обязательной проверке, которая регламентирована Гражданским кодексом РФ. Порядок инспектирования представлен в заключительном договоре. Или же ревизия проводится согласно действующему законодательству. Операция выполняет несколько задач: позволяет определить бракованную партию; выявляет недостачу; раскрывает виновных лиц по возмещению материальных убытков.'
  },
  {
    id:31,
    questionS: 'фпп',
    questionL:'Формы производственных процессов. Основы оперативного планирования и управления материальными потоками в производстве.',
    answer:'Формы организации производственных процессов– это способы сочетания в пространстве различных элементов производства. Концентрация – форма организации производства, при которой происходит процесс сосредоточения производства в более крупных предприятиях, производствах, цехах и регионах. Специализация– форма организации производства, при которой происходит выделение особого (специализированного) вида производства и создание нового производственного процесса, подразделения. Комбинирование– форма организации производства, при которой производство продуктов ведется из готовых продуктов предыдущего передела или из отходов производства других переделов. В основе оперативного планирования и управления лежит производственная программа, в рамках которой разрабатываются детализированные плановые задания для каждого производственного подразделения (цеха, участка, рабочего места) на определенный период времени, а также осуществляется текущее руководство производственным процессом и контроль его хода.'
  },
  {
    id:32,
    questionS: 'рпв',
    questionL:'Роль посредников в сбытовых процессах. Виды посредников.',
    answer:'Посредники - это независимые организации, осуществляющие разнообразную деятельность по продвижению товара. В качестве посредников могут выступать снабженческо-сбытовые организации, крупные оптовые базы, биржевые структуры, торговые дома и магазины. Различают: торговых посредников, фирмы, осуществляющие товародвижение; агентства маркетинговых услуг и финансовых посредников.'
  },
  {
    id:33,
    questionS: 'увл',
    questionL:'Упаковка в логистике: понятие, функции, свойства упаковки, виды.',
    answer:'Упаковка – средство или комплекс средств, обеспечивающих защиту груза от повреждений и потерь, вредного воздействия окружающей среды, загрязнения и облегчающих процесс обращения с грузом, включая хранение, транспортирование и перегрузку. Виды упаковки в логистике: коммерческая, коллективная и транспортная. С точки зрения логистики упаковка выполняет ряд функций (защитную, информационную, манипуляционную, складскую и транспортную), существенно влияющих на затратоемкость логистических процессов.'
  },
  {
    id:34,
    questionS: 'вив',
    questionL:'Вытягивающая и выталкивающая логистическая система.',
    answer:'Толкающая система — это такая организация движения материального потока, при которой материальные ресурсы подаются с предыдущей операции на последующую в соответствии с заранее сформированным жестким планом-графиком. Тянущая система — это такая организация движения материального потока, при которой материальные ресурсы подаются («вытягиваются») на следующую технологическую операцию с предыдущей по мере необходимости (т. е. жесткий график движения материального потока отсутствует).'
  },
  {
    id:35,
    questionS: 'сс',
    questionL:'Система складирования.',
    answer:'Система складирования — это определенным образом организованная совокупность взаимосвязанных элементов, обеспечивающая оптимальное размещение материального потока на складе и рациональное управление им. Структуру системы складирования образуют технико-экономическая, функциональная и поддерживающая подсистемы. Выбор системы складирования зависит от многих внутренних и внешних факторов, таких как вид транспорта которым доставляют грузы, интенсивность грузового потока, особенности поставщиков и потребителей, используемая грузовая единица, вид комиссионирования, оснащенность склада и даже способы обработки информации.'
  },
  {
    id:36,
    questionS: 'твл',
    questionL:'Транспортировка в логистических системах: место транспортной логистики в логистической цепи поставок, функции транспортировки.',
    answer:'Функции транспортировки: 1) перемещение груза. Перемещение груза по логистической цепочке позволяет преобразовать добываемое сырье в готовую продукцию, а затем доставить ее конечному покупателю. 2) хранение груза. В процессе перевозки происходит также и хранение груза, т. е. не занимаются складские площади. Эта функция перевозки актуальна, если существует ограничение в складских площадях, тогда можно осознанно избирать более медленные способы транспортировки. По своей сути транспорт является проводником материального потока, единственной причиной его движения на межорганизационном уровне (внутри организации существует еще внутрицеховое перемещение материального потока в процессе производства, не относящееся к транспорту, а также перевозки внутри предприятия, осуществляемые часто при помощи складской техники).'
  },
  {
    id:37,
    questionS: 'ркп',
    questionL:'Распределительные каналы: понятие, основные виды и характеристики.',
    answer:'Распределительный канал - это совокупность связей, установленных между несколькими коммерческими организациями, которые способствуют продвижению, т. е. продаже готовой продукции (товаров, работ, услуг) конечным потребителям. Каналы распределения могут быть трех видов: 1. Прямые - связаны с перемещением товаров и услуг от производителя к потребителю без участия посреднических организаций; 2. Косвенные - связаны с перемещением товаров и услуг сначала от изготовителя к незнакомому участнику - посреднику, а затем от него - к потребителю; 3. Смешанные - объединяют черты прямых и косвенных каналов товародвижения.'
  },
  {
    id:38,
    questionS: 'втд',
    questionL:'Виды транспорта. Достоинства и недостатки использования разных видов транспорта.',
    answer:'К достоинствам железнодорожного транспорта относятся: высокая провозная и пропускная способность; регулярность перевозок независимо от климатических условий, времени года и суток; невысокая себестоимость перевозок грузов; более высокая скорость доставки грузов. К недостаткам следует отнести большие капитальные вложения на сооружение постоянных устройств и затраты металла на 1 км пути. Морской транспорт обеспечивает межконтинентальные перевозки грузов; имеет низкую себестоимость перевозок на дальние расстояния; более высокую, чем на речном транспорте, скорость движения; небольшие капитальные вложения в устройства пути. К недостаткам относятся: зависимость от географических и навигационных условий. Речной транспорт имеет высокую провозную способность на глубоководных реках; невысокую себестоимость перевозок, небольшие капитальные затраты. К недостаткам речного транспорта относятся: неравномерность глубин рек, сезонность работы, небольшая скорость перевозки. К достоинствам автомобильного транспорта относятся: большая маневренность и подвижность; высокая скорость доставки грузов; доставка продукции без промежуточных перегрузок и непосредственно со склада отправителя до склада получателя. Недостатками являются низкая производительность труда, уровень эксплуатационных показателей и состояние дорожной сети (в настоящее время). Трубопроводный транспорт (нефтепродуктопроводы, газопроводы и др.) обладает тем преимуществом, что прокладка трубопроводов и перекачка нефтепродуктов в больших объемах возможны повсеместно. При этом обеспечиваются низкая себестоимость и полная герметизация транспортировки, автоматизация операций налива, перекачки и слива. Этот вид транспорта требует меньших по сравнению с другими видами транспорта капитальных вложений и расхода металла. К недостаткам следует отнести его узкую специализацию. Воздушный транспорт имеет высокую скорость доставки груза, большую дальность беспосадочного полета, более короткие по сравнению с другими видами транспорта маршруты следования. Недостатком является высокая себестоимость перевозки грузов, поэтому он используется в основном для перевозки пассажиров.'
  },
  {
    id:39,
    questionS: 'геп',
    questionL:'Грузовая единица: понятие, виды.',
    answer:'Грузовая единица – это некоторое количество грузов, которые погружают, транспортируют, выгружают и хранят как единую массу. Можно выделить два основных вида грузовых единиц: – первичная грузовая единица – груз в транспортной таре, например в ящиках, бочках, мешках и т. п.; – укрупненная грузовая единица – грузовой пакет, сформированный на поддоне из первичных грузовых единиц, т. е. грузов в транспортной таре.'
  },
  {
    id:40,
    questionS: 'лок',
    questionL:'Логистические операторы. Классификация. Особенности функционирования.',
    answer:'Логистический оператор - это обслуживающая организация, которая отвечает за оказание поддержки компаниям в транспортировке, хранении, доставке и распределении продукции от поставщика покупателю или конечному потребителю; конечно, за определенную плату. Классификация: 1PL, 2PL, 3PL, 4PL. Где PL означает «сторона логистики». Цифры обозначают то, на сколько «глубоко» оператор вовлечен в процессы, связанные с логистическими операциями.'
  },
  {
    id:41,
    questionS: 'охп',
    questionL:'Организация хранения продукции на складе. Способы хранения.',
    answer:' 2 способа хранения товаров на складе: Штабельное хранение (на поддонах),При этом существует несколько типов укладки: прямой – товар упакован в ящики одного размера, их ставят один на другой, верхний и нижний ряды совпадают; перекрестный – верхний ряд с товаром в удлиненных ящиках помещают поперек нижнего; обратный – применяется при хранении товара в мешках. Первый ряд может состоять из пяти и более мешков, следующий - укладывают в том же количестве, но в обратном порядке.; Хранение на стеллажах Сверху размещают товары, которые отпускаются партиями, внизу – без упаковки, которые отбираются и сортируются вручную.'
  },
  {
    id:42,
    questionS: 'оаи',
    questionL:'Организационные аспекты и принципы логистического управления.',
    answer:'Принцип глобальной оптимизации, предполагающий, что при оптимизации структуры или управления логистической системой необходимо согласовать локальные цели функционирования элементов системы для достижения глобального оптимума. Принцип тотальных затрат заключается в учете всей совокупности издержек управления материальными и сопутствующими финансовыми и информационными потоками по всей логистической цепи. Принцип разработки необходимого комплекса подсистем, обеспечивающих процесс логистического управления технической, экономической, экологической, организационной, правовой, кадровой и иной поддержкой.'
  },
  {
    id:43,
    questionS: 'риз',
    questionL:'Роль и значение информации в логистике.',
    answer:'Информация используется при выработке и принятии управленческих решений в логистической системе.Информационная логистика организует поток данных, сопровождающих материальный поток, и является тем существенным для предприятия звеном, которое связывает снабжение, производство и сбыт. Информационная логистика организует информационные потоки и реализует информационные процессы, протекающие в логистической системе.'
  },
]

const start = () => {
  bot.setMyCommands([
    {command:'/start' , description:'Запуск бота'}
  ])
  
  bot.on('message' , async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    if(text == '/start'){
      return bot.sendMessage(chatId, 'Введи номер вопроса, Первые буквы в первых 3 словах или просто напиши вопрос(можно не полностью, работает система фильтрации)')
    }

    return searchAnswer(chatId,text)
  })
}

function searchAnswer(chatId , text){
  let answers
  text = text.trim()
  if(Number(text)){
    answers = dataQuest.filter(item => item.id == Number(text))
  }

  if(!Number(text) && text.length <= 3){
    answers = dataQuest.filter(item => item.questionS == text.toLowerCase())
  }

  if(text.length > 3){
    answers = dataQuest.filter(item => item.questionL.toLowerCase().includes(text.toLowerCase()))
  }

  if(answers && answers.length > 0){
    answers.forEach(answer => {
      bot.sendMessage(chatId , `Номер вопроса ${answer.id}\n\nВопрос: ${answer.questionL}\n\nОтвет: ${answer.answer}`)
    })
  }else{
    bot.sendMessage(chatId , `Не нашел такого вопроса в базе`)
  }
  return 
}

start()


