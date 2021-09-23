const { createClient } = require("@supabase/supabase-js");
require("isomorphic-fetch");
const supabase = createClient(
  ["https://awstscurqptrsqnliiln.supabase.co"],
  [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjA0NTIyMCwiZXhwIjoxOTQ3NjIxMjIwfQ.5R4sUN_wYVS3-J963FCxnB9GInv2BInpgV0MhxYtpFs",
  ]
);

const reciters = [
  "Sheikh Yusuf Al-Aidrous",
  "Nourin Mohamed siddique",
  "Abdul Muttalib ibn 'Achoura",
  "Mohammed Othman",
  "Abdurashid Sh Ali Sufi",
  "Abdualhalim Hessin",
  "Sharif Zain",
  "Darul Hadeeth Dammaj",
  "Alhadi Altijani",
  "Sheikh Abdi Rashid",
  "Abdul Aziz Al Zahrani",
  "Imam Faisal Mohammad",
  "Shaykh Ahmed Rajab",
  "Sheikh Hassan Saleh",
  "Abduqadir",
  "Sami Al Hasan",
  "Imam Othman Kamel",
  "Mohammed Othman",
  "Sheikh Al Hudayfi",
  "Sheikh Ali Jaber",
  "Okasha Kameny",
  "Anas Ali",
  "Ustadh Jamal Abdinasir",
  "Suleiman al-Maali",
  "Abdinasir Farah",
  "Sheikh Abdulrahman Hirsi",
  "al huda taraweeh",
  "Sheikh Abdul Aziz Al-Dabikhi",
  "Abdulghaffar Wardhere",
  "Salah bukhatir",
  "Muhammad Ayyub",
  "Mohamed Salad",
  "Amer Al-Kazemi",
  "Rajab Zaki",
  "Abdulwali Al-Arkani",
  "abdiqaadir Cabdilaahi & Maxamed Saciid",
  "Ramadan Shible",
  "Imam Faisal",
  "Omar Sharif",
  "Salah Al Budair",
  "Nucmaan Bashiir",
  "Qaari Abdinasir",
  "Ahmed Abdirashid Ali Sufi",
  "Hassan Al waajidi",
  "Abdul-Wadood Haneef",
  "XASAN AL WAAJIDI AL QAARIC",
  "Hassan Al Wajidi",
  "Al Houdhayfi",
  "Imam Feysal",
  "Yusuf Al-Aidarous",
  "Abdullah Al-Matrood",
  "Khalil Al Qari",
  "Muhammad ayyub",
  "Adil Al-Kalbani",
  "Mohamud Markoni",
  "Other",
  "NIMAN BASHIR MOHAMUD",
  "Ahmed Burhan Mohamed",
  "Abuu Jabal Hayder Al-Haatimee",
  "Abdulrahman Hassan",
];

const IDS = [
  "hO5wCnVLHWU",
  "bEGm_DHmiuk&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=3&ab_channel=محبالخير",
  "Wmbt8a9RPrE&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=4&ab_channel=NaqaaStudio",
  "C2BMIMWnt-c&ab_channel=UniqueQuranUniqueQuran",
  "4ToJYAOQ-BE&t=19s&ab_channel=NaqaaStudio",
  "P00F8z6_9RI&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=8&ab_channel=muslim13100",
  "b5UU1xmiTmY&t=6s&ab_channel=UniqueQuran",
  "d-8Zho0kFEc&t=9s&ab_channel=UniqueQuran",
  "eIIGLkj2Bm0&t=12s&ab_channel=NaqaaStudio",
  "a41MKjpsH_c&t=11s&ab_channel=UniqueQuran",
  "pggcG0XwBTA&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=24&ab_channel=Muqbil",
  "JskuxU44UOw&t=20s&ab_channel=NaqaaStudio",
  "tRnuRmK9vuY",
  "P-H6XZvf7mM",
  "hATbP1aGSCc&t=3s&ab_channel=UniqueQuran", // Surah Ankabut
  "FDTkE9MI43k&t=7s",
  "0dzsXQb_MYc&t=7s",
  "Z9dz6_LybSU&t=39s&ab_channel=Beyzanishantasomali",
  "lD40MsqrI6I&ab_channel=HassanSaleh",
  "cFDYqgZhWmw&ab_channel=HassanMasoud",
  "0t9jEGXDaDA&t=20s&ab_channel=AbdalaShuraym",
  "x9xjKWePfAI&t=10s&ab_channel=UniqueQuran",
  "cia8JLXLrvc&t=6s&ab_channel=UniqueQuran",
  "Y63kr37P7Gc&t=13s&ab_channel=PearlsOfKnowledge",
  "C-DezfgLumU&t=7s&ab_channel=UniqueQuran",
  "SD9-FFDcyTE&ab_channel=BouilleRochdiBouilleRochdi",
  "T6e_Nm6DvJM&ab_channel=tawus7691tawus7691",
  "Dp9qvYIMRTA&ab_channel=InkTVInkTV",
  "1tob6BxH474&ab_channel=InkTVInkTV",
  "8rshbLpiG9Y&t=27s&ab_channel=AlMadrasatuAlUmariyyah",
  "Q3d_jeHESck&t=27s&ab_channel=AlMadrasatuAlUmariyyah",
  "rT1SzQEcrxE&t=29s&ab_channel=AlMadrasatuAlUmariyyah",
  "f_zM7xEJfpQ&ab_channel=abdelmalikabouaichaabdelmalikabouaicha",
  "JaXYk15stts&ab_channel=MuqbilMuqbil",
  "lb0WZRCoMcA&ab_channel=MuqbilMuqbil",
  "lbjaMn7X6YI&t=8s&ab_channel=TvIslaamaa",
  "lBGgXfGH2go&ab_channel=MunaSaeedMunaSaeed",
  "4miSBhRiem4&ab_channel=agentlightning",
  "qAIlNvErZFY&ab_channel=AliAlotaibi",
  "Oh01qYCzVE4&t=10s&ab_channel=abdirahmanNuurJimcaale",
  "CiFAr86BS-Q&t=2s&ab_channel=MinarMedia",
  "9S6QNq6pRHs&ab_channel=Saiditaraالقارئسعيدإتارى",
  "0xpB_48uswg&ab_channel=DailyIslamicBenefits",
  "Lg7SPMXiG14&ab_channel=TaleexWacaan",
  "L1AUa1uzT6k&ab_channel=Amer-AlKadhmayعامرالكاظمي",
  "NIoY0SJIycM&t=7s&ab_channel=TheQuranProject",
  "Jb22cetMpzA&t=6s&ab_channel=shahidaxD",
  "nxyueNqrhLk&t=45s&ab_channel=SalaamStudio",
  "v5Yqe9jFYO0&t=65s&ab_channel=AlFurqanCentre%28MasjidAlFurqan%29",
  "ulZXOfJbDdQ&ab_channel=husseinaliraqi",
  "dOW0pVnaor4&t=10s&ab_channel=IbrahimAdhhamAli",
  "YzrOf0yH5qs&t=5s&ab_channel=ORIGINALTAWHEED",
  "ZE2zxM8Fl5k&t=12s&ab_channel=Zaitoon55",
  "rVUDMw6IIzk&t=3s&ab_channel=HolyQuran",
  "52ysVzk_U-E&t=10s&ab_channel=AlMaxabbah",
  "H2qqrfRSALw&ab_channel=TaleexWacaan",
  "iWqy1pXcndg&t=13s&ab_channel=ALBAYAANUK",
  "6ABibmGp3Ik&t=16s&ab_channel=SheikhHassanAl-waajidiOfficialChannel",
  "G3u-MHPqZZw&ab_channel=السنيةالسلفية",
  "Lg7SPMXiG14",
  "_q6TJD0ttO4&t=5s",
  "JDsfr0d-8jM",
  "srCy6oxNbYs&t=4s",
  "NUXJz8UL_p8&t=8s",
  "-l0I8Uak-IQ",
  "bdi877qwKgM&t=33s",
  "eRYqtmWv8KQ&t=8s&ab_channel=MahdeeHasanStudio",
  "PiI8fIGF-nY&ab_channel=MahdeeHasanStudioMahdeeHasanStudio",
  "fj1Ijaj_ceE&t=2s&ab_channel=sheikhAbdirhamanbukhari",
  "BbSCFOBTfgc&t=11s&ab_channel=اللعبان",
  "BoGP5arVC88&t=4s&ab_channel=AmelSoname",
  "FtpvHlbvQkg&t=7s&ab_channel=abdwaliyuddin",
  "l1RNV16J_Oo&ab_channel=abdwaliyuddinabdwaliyuddin",
  "jFv49fYBhnI&t=5s&ab_channel=MrM4nsoor",
  "24zDC_Qc60A&ab_channel=IslamExplainedIslamExplained",
  "jcttVRPMh-8&t=12s&ab_channel=ThelightofholyQuran",
  "O9ULdDIzbeM&t=9s&ab_channel=الكلباني-Alkalbani",
  "NK6i5JLrbVw&t=38s&ab_channel=Salafmedia",
  "cmpYjCPQXmU&ab_channel=NiinCuluus",
  "uiE3JJd6Lag&t=40s&ab_channel=AlFurqanCentre%28MasjidAlFurqan%29",
  "JtjftCjDH1Q&t=22s&ab_channel=ReadandAscend",
  "pCLWMuaoNLo&t=91s&ab_channel=جائزةدبيالدوليةللقرآنالكريمDIHQA",
  "1FUl7IhOi24&t=8s&ab_channel=ISLAMICVIDEOS",
  "BTHo0_ii3uo&t=41s&ab_channel=AmirMuhammadAl-Yemani",
  "f_1hwmtLr9Q&t=22s&ab_channel=NaqaaStudio",
  "vNSu3_NoW9E&feature=youtu.be&ab_channel=AlMadrasatuAlUmariyyah",
];

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

const columns = reciters.map((r) => {
  const name = titleCase(r.toLowerCase().trim());
  return {
    name,
  };
});

const createURL = (id) => {
  return `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyDDD1z3mHXftDauaT9CbPgb9dwG13A8qfo%20&part=snippet`;
};

async function init() {
  const { data: reciters } = await supabase
    .from("reciters")
    .select("name,reciter_id");

  const sanitiseIds = IDS.map((id) => {
    const parts = id.split("&");
    return parts[0];
  });

  for (const id of sanitiseIds) {
    const res = await fetch(createURL(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    const title = titleCase(json.items[0].snippet.title.toLowerCase().trim());
    const match = reciters.find((r) => title.indexOf(r.name) !== -1);
    if (match) {
      const { data, error } = await supabase.from("recitations").insert([
        {
          reciter_id: match.reciter_id,
          video_url: "https://www.youtube.com/watch?v=" + id,
        },
      ]);
      console.log("data", data);
      console.log("error", error);
    }
  }
}

init();
