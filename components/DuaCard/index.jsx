import React, { useMemo } from 'react';

const DUAS = [
  {
    id: 1,
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    english: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
    reference: 'Qur’an 2:201'
  },
  {
    id: 2,
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    english: 'My Lord, increase me in knowledge.',
    reference: 'Qur’an 20:114'
  },
  {
    id: 3,
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    english: 'My Lord, expand for me my chest and ease for me my task.',
    reference: 'Qur’an 20:25–26'
  },
  {
    id: 4,
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً',
    english: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy.',
    reference: 'Qur’an 3:8'
  },
  {
    id: 5,
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا',
    english: 'My Lord, forgive me and my parents and have mercy upon them.',
    reference: 'Qur’an 17:24'
  }
];

function getDailyIndex(len) {
  const today = new Date();
  const dayCount = Math.floor(today.getTime() / (24 * 60 * 60 * 1000));
  return dayCount % len;
}

const DuaCard = () => {
  const daily = useMemo(() => DUAS[getDailyIndex(DUAS.length)], []);

  const tweetText = `${daily.arabic}\n\n${daily.english} (${daily.reference})\n\nListening on https://quran.cafe #QuranCafe`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const handleShare = () => {
    try {
      window.open(shareUrl, '_blank', 'noopener');
    } catch {
      window.location.href = shareUrl;
    }
  };

  return (
    <div className="panel-card w-full md:max-w-[22rem]">
      <div className="panel-header px-3 py-2 text-sm uppercase tracking-wide">Reminders For The Believers</div>
      <div className="p-3">
        <div className="space-y-2">
          <div className="text-xl leading-8">{daily.arabic}</div>
          <div className="text-sm leading-6">{daily.english}</div>
          <div className="text-xs font-semibold" style={{ color: '#ffa700' }}>{daily.reference}</div>
          <div className="flex justify-end pt-1">
            <button onClick={handleShare} className="px-2 py-1 text-xs font-bold border border-black rounded" style={{ backgroundColor: '#ffa700', color: '#000' }}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuaCard;