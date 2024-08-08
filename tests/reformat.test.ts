const input =
    `일론 머스크
이 책에 하이라이트한 회원 9240명
88개

움직이지 않으면 아무것도 바뀌지 않는다

2023-09-27 07:58:29
그러면서 그는 자신이 아이들을 신체적, 감정적으로 강인하게 키우기 위해 아주 엄하게 대했다는 사실도 인정한다.

위플래쉬 아님ㅋㅋ

2023-09-27 18:42:34
일론은 두려움을 차단하는 법을 배웠어요. 두려움을 차단한 사람이라면, 기쁨이나 연민 같은 감정도 차단해야 했겠죠

2023-09-27 18:45:10
어린 시절에 얻은 외상후 스트레스 장애PTSD로 그는 만족에 대한 혐오감을 갖게 되었다. “난 그저 그가 성공을 음미하거나 꽃길을 향유하는 법을 모른다고 생각해요.”

2023-09-27 18:45:24
“일론은 리스크 그 자체를 원합니다.” 페이팔PayPal 초창기에 머스크의 파트너로 일했던 피터 틸은 말한다. “그는 리스크를 즐기는 듯합니다. 때로는 정말 리스크에 중독된 것처럼 보이기도 하고요.”

이해할 수 없는 종족이다.. 나랑은 확실히 다른

2023-09-27 18:50:34
우리는 점차 폭력으로부터 도망치려고 하지 않게 되었어요. 폭력을 이겨내고 살아남으려 했지요”`;


function deleteNewLine(input:string): string[] {
    const input_list: string[] =  input.split('\n').slice()
    for (var i=0; i < input_list.length; i++) {
        if (input_list[i] === "") {
            input_list.splice(i,1);
        }
    }
    return input_list
}


function extractTitle(input:string): string {
    const input_list: string[] =  input.split('\n').slice()
    return input_list[0]
}


function sliceInfos(no_new_line_list: string[]): string[] {
    // 제목, 이 책에 하이라이트한 회원, 하이라이트 수 삭제
    return  no_new_line_list.slice(3)
}


function findRegExp(dateInput: string) {
    const re = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/;
    if (dateInput.match(re)) return "matches";
}


function extractHighlightsAndMemos(input_text: string): string[] {
    const re = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/;
    const sliced_no_new_line_list: string[] = deleteNewLine(input_text).slice(3);
    const highlights_and_memos: string[] = [];

    for (let i = 0; i < sliced_no_new_line_list.length; i++) {
        // re format이 아닌 case들
        if (!sliced_no_new_line_list[i].match(re)) {
            highlights_and_memos.push(sliced_no_new_line_list[i]);
            if (i < sliced_no_new_line_list.length - 1) {
                // 다음 아이템 또한 re format이 아닌 case들 == 나의 메모
                if (!sliced_no_new_line_list[i + 1].match(re)) {
                    highlights_and_memos.push(`나의 메모: ${sliced_no_new_line_list[i + 1]}`);
                    highlights_and_memos.push("");
                    sliced_no_new_line_list.splice(i + 1, 1);
                } else {
                    highlights_and_memos.push(""); // Insert empty string if not "나의 메모"
                }
            }
        }
    }
    return highlights_and_memos;
}


function reformat_millie(input: string): string[] {
    const title: string = extractTitle(input);
    const highlights_and_memos = extractHighlightsAndMemos(input);
    highlights_and_memos.push(title, ...highlights_and_memos);
    return highlights_and_memos;
}


test('Validate extractTitle function', () => {
    expect(extractTitle(input)).toBe("일론 머스크");
});

test('Validate deleteNewLine function', () => {
    expect(deleteNewLine(input)).not.toContain("");
})

test('Make sure hightlights_and_memos does not contain Date', () => {
    const re = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/;
    const highlights_and_memos:string[] = extractHighlightsAndMemos(input);
    expect(highlights_and_memos).not.toContain(re);
})

test('Validate findRegExp function', () => {
    expect(findRegExp("2023-09-29 12:25:33")).toBe("matches")
})


test('Final e2e test', () => {
    reformat_millie(input)
})