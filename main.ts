//% weight=100 color=#0088FF icon="AI" block="Knowledge AI"
namespace knowledgeAI {
    let questions: string[] = []
    let answers: string[] = []

    //% block="add Q&A: $q → $a" blockGap=8
    export function addKnowledge(q: string, a: string) {
        questions.push(q)
        answers.push(a)
    }

    //% block="ask AI $input" blockGap=12
    export function askAI(input: string): string {
        if (questions.length == 0) return "No knowledge yet."

        let bestIndex = 0
        let bestScore = 0

        for (let i = 0; i < questions.length; i++) {
            const score = scoreMatch(input.toLowerCase(), questions[i].toLowerCase())
            if (score > bestScore) {
                bestScore = score
                bestIndex = i
            }
        }

        if (bestScore == 0) return "I don't understand."
        return answers[bestIndex]
    }

    function scoreMatch(input: string, target: string): number {
        let score = 0
        const inputWords = input.split(" ")
        const targetWords = target.split(" ")

        for (let word of inputWords) {
            if (targetWords.indexOf(word) >= 0) {
                score++
            }
        }

        return score
    }
}
