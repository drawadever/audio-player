document.addEventListener('transcriptLoaded', function(event) {
    const audioPlayer = document.getElementById('audioPlayer');
    const transcriptElement = document.getElementById('transcript');
    const transcriptData = event.detail;
    let currentHighlight = null;  // currentHighlight 변수를 초기화합니다.
    
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
                wordSpan.dataset.endTime = wordInfo.end;  // endTime 추가
                
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
                segmentSpan.dataset.endTime = segmentInfo.end;  // endTime 추가
                
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

        // 오디오 재생 위치를 추적하여 자막 하이라이트 업데이트
        audioPlayer.addEventListener('timeupdate', function() {
            const currentTime = audioPlayer.currentTime;
            // 현재 시간에 해당하는 자막을 찾고 하이라이트
            const spans = transcriptElement.querySelectorAll('span');
            spans.forEach(span => {
                const startTime = parseFloat(span.dataset.startTime);
                const endTime = parseFloat(span.dataset.endTime);

                if (currentTime >= startTime && currentTime <= endTime) {
                    if (currentHighlight !== span) {
                        if (currentHighlight) {
                            currentHighlight.classList.remove('highlight');
                        }
                        span.classList.add('highlight');
                        currentHighlight = span;
                    }
                } else {
                    span.classList.remove('highlight');
                }
            });
        });
    } else {
        transcriptElement.textContent = "Error: Unable to load the transcript.";
    }
});
