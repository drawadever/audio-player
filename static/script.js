document.addEventListener('transcriptLoaded', function(event) {
    const audioPlayer = document.getElementById('audioPlayer');
    const transcriptElement = document.getElementById('transcript');
    const transcriptData = event.detail;
    
    // <h1> 요소에 <title> 태그의 내용을 불러오기
    const titleText = document.title;
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
        pageTitleElement.textContent = titleText; //
    }

    if (audioPlayer && transcriptElement && transcriptData.words) {
        transcriptElement.innerHTML = '';
        transcriptData.words.forEach(wordInfo => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = wordInfo.word;
            wordSpan.classList.add('word');
            wordSpan.dataset.startTime = wordInfo.start;
            
            wordSpan.addEventListener('click', function() {
                audioPlayer.currentTime = parseFloat(this.dataset.startTime);
                audioPlayer.play();
            });

            transcriptElement.appendChild(wordSpan);
            transcriptElement.appendChild(document.createTextNode(' '));
        });

        audioPlayer.style.display = 'block';  // 자막 생성 후 오디오 플레이어 표시
    } else {
        transcriptElement.textContent = "Error: Unable to load the transcript.";
    }
});
