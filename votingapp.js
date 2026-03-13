//Stores votes in array
let votes =[]
//Available options

const options=["yes","no","maybe"]

// Function to handle voting
function vote(choice){
    votes.push(choice)
    console.log(votes)
    updateResults()
}

//funstion to count votes using for..of and return two arrays
function countVotes(votesArray){
    //create a parrelel arrays
    const voteOptions=[]//array of options
    const voteCounts=[]//Array of counts
//loop through each vote using for..of
for (let currentVote of votesArray){
    //check if this option already exists
    let foundIndex=-1
    let index = 0


    //searc through options array
    for(let option of voteOptions){
        if(option==currentVote){
            foundIndex = index
            break
        }
        index++
    }
      
    //if found implement count at that index
    if(foundIndex!== -1){
        voteCounts[foundIndex]++
    }else{
        //if not found, add to both arrays
        voteOptions.push(currentVote)
        voteCounts.push(1)
    }
}
//function voteHistory
function voteHistory(){
    return votes
}
//display vote history on page
function displayVoteHistory(){
    const history = voteHistory()
    let html = `<h2>Vote History</h2>`
    if(history.length === 0){
        html += `<p class="no-votes"> No votes cast yet. </p>`
    }else{
        html += `
        <ul class="vote-list">
            ${history.map(vote => `<li>${vote}</li>`).join('')}
        </ul>
        `
    }
    document.getElementById('result').innerHTML += html
}

//return both arrays
return [voteOptions, voteCounts]

}

//function to reset the votes
function resetVotes(){
    votes =[]
    updateResults()
}

// function to calculate total votes
function getTotalVotes(){
    return votes.length
}

// function to calculate total votes percentage
function getTotalVotesPercentage(){
    const total = getTotalVotes()
    if(total === 0) return 0
    const [_, voteCounts] = countVotes(votes)
    const percentages = voteCounts.map(count => (count / total) * 100)
    return percentages
}
//display percentage on html
function displayVotePercentages(){
    const percentages = getTotalVotesPercentage()
    let html = `<h2>Vote Percentages</h2>`
    const [voteOptions] = countVotes(votes)
    for(let i = 0; i < voteOptions.length; i++){
        html += `
        <div class="result-item">
            <span class="result-label"> ${voteOptions[i]} </span>
            <span class="result-percentage"> ${percentages[i].toFixed(2)}% </span>
        </div>
        `
    }
    document.getElementById('result').innerHTML += html
}

//function to update the results in display using for..of method using arrays
function updateResults(){
    let resultDiv = document.getElementById('result')
    // to check whether array is empty or not
    if(votes.length==0){
        resultDiv.innerHTML = `
        
            <h2>Results</h2>
            <p class="no-votes"> No votes yet, cast your votes for details. 67</p>
        `;
        // Also clear vote history if no votes
        document.getElementById('voteItems').innerHTML = `<p class='no-votes'> No votes cast yet. </p>`;
        return
    }

    //get two seperate arrays
    const [voteOptions, voteCounts] = countVotes(votes)

    // Build results HTML
    let html = `<h2>Results</h2>`
    let index = 0
    for(let option of voteOptions){
        const count = voteCounts[index]
        html +=`
            <div class="result-item">
                <span class="result-label"> ${option} </span>
                <span class="result-count"> ${count }</span>
            </div>
        `
        index++
    }

    // Add percentages
    const percentages = getTotalVotesPercentage()
    html += `<h2>Vote Percentages</h2>`
    for(let i = 0; i < voteOptions.length; i++){
        html += `
            <div class="result-item">
                <span class="result-label"> ${voteOptions[i]} </span>
                <span class="result-percentage"> ${percentages[i].toFixed(2)}% </span>
            </div>
        `
    }

    resultDiv.innerHTML = html

    // Add vote history to its own section
    const history = voteHistory()
    let historyHtml = ''
    if(history.length === 0){
        historyHtml += `<p class="no-votes"> No votes cast yet. </p>`
    }else{
        historyHtml += `
            <ul class="vote-list">
                ${history.map(vote => `<li>${vote}</li>`).join('')}
            </ul>
        `
    }
    document.getElementById('voteItems').innerHTML = historyHtml
}

