document.addEventListener('transcriptLoaded', function(event) {
    const audioPlayer = document.getElementById('audioPlayer');
    const transcriptElement = document.getElementById('transcript');
    const transcriptData = event.detail;
    
    // <h1> 요소에 <title> 태그의 내용을 불러오기
    const titleText = document.title;
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
        pageTitleElement.textContent = titleText;
    }

    transcriptElement.innerHTML = '';

    if (audioPlayer && transcriptData) {
        if (transcriptData.words) {
            // words 데이터를 처리하는 로직
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
        } else if (transcriptData.segments) {
            // segments 데이터를 처리하는 로직
            transcriptData.segments.forEach(segmentInfo => {
                const segmentSpan = document.createElement('span');
                segmentSpan.textContent = segmentInfo.text.trim();  // 앞뒤 공백 제거하여 텍스트 추가
                segmentSpan.classList.add('segment');
                segmentSpan.dataset.startTime = segmentInfo.start;
                
                segmentSpan.addEventListener('click', function() {
                    audioPlayer.currentTime = parseFloat(this.dataset.startTime);
                    audioPlayer.play();
                });

                transcriptElement.appendChild(segmentSpan);
                transcriptElement.appendChild(document.createTextNode(' '));
            });
        } else {
            transcriptElement.textContent = "Error: Unable to load the transcript.";
        }

        audioPlayer.style.display = 'block';  // 자막 생성 후 오디오 플레이어 표시
    } else {
        transcriptElement.textContent = "Error: Unable to load the transcript.";
    }
});
