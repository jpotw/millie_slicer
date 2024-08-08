// function deleteNewLine(input:string): string[] {
//     const input_list: string[] =  input.split('\n').slice()
//     for (var i=0; i < input_list.length; i++) {
//         if (input_list[i] === "") {
//             input_list.splice(i,1);
//         }
//     }
//     return input_list
// }


function extractTitle(input:string): string {
    const input_list: string[] =  input.split('\n').slice()
    return input_list[0]
}


// function sliceInfos(no_new_line_list: string[]): string[] {
//     // 제목, 이 책에 하이라이트한 회원, 하이라이트 수 삭제
//     return  no_new_line_list.slice(3)
// }

// function findRegExp(dateInput: string) {
//     const re = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/;
//     if (dateInput.match(re)) return "matches";
// }


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


export function reformat_millie(input: string): string[] {
    const title: string = extractTitle(input);
    const highlights_and_memos = extractHighlightsAndMemos(input);
    highlights_and_memos.push(title, ...highlights_and_memos);
    return highlights_and_memos;
}
