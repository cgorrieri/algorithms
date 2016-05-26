var sudoku = [
	[0,3,0,0,0,1,4,0,0],
	[5,0,7,2,0,0,6,0,0],
	[0,0,1,3,6,7,2,0,9],
	[0,1,8,0,5,9,0,0,0],
	[0,0,3,0,0,0,9,0,0],
	[0,0,0,1,2,0,8,6,0],
	[1,0,2,4,8,6,5,0,0],
	[0,0,4,0,0,5,7,0,2],
	[0,0,9,7,0,0,0,4,0]
];

var solution = [
	[2,3,6,5,9,1,4,7,8],
	[5,9,7,2,4,8,6,3,1],
	[4,8,1,3,6,7,2,5,9],
	[7,1,8,6,5,9,3,2,4],
	[6,2,3,8,7,4,9,1,5],
	[9,4,5,1,2,3,8,6,7],
	[1,7,2,4,8,6,5,9,3],
	[3,6,4,9,1,5,7,8,2],
	[8,5,9,7,3,2,1,4,6]
]

/**
 * Solve a sudoku given a specific board, the board will be solved in place
 * @param board
 * @param row (Optional) the row to start looking for empty spot
 * @param col (Optional) the col to start looking for empty spot
 */
function solveSudoku(board, row, col) {
	row = row || 0;
	col = col || 0;

	// Find location to put a number
	while(row < 9 && board[row][col] != 0) {
		col++;
		if(col == 9) {
			col = 0;
			row++;
		}
	}

	// if we dont find any empty spot, it means we are done
	if(row == 9) return true;

	var numbers = findNumbers(board, row, col);

	// Loop through all the numbers and see the one we can put
	for(var i = 1; i < 10; i++) {
		// If the number is present we cannot put it at this place, so we go to the next one
		if(numbers[i]) continue;

		// else we put the possible number in the board
		board[row][col] = i;

		// See with recursivity how it matches,
		// If it matches we return true
		if(solveSudoku(board, row, col)) return true;

		// Otherwise we remove this number and go to the next one
		board[row][col] = 0;
	}

	// If nothing matches we simply return false
	return false;
};

/**
 * Find the numbers in the same column, row and block of the current position
 * @param board
 * @param row
 * @param col
 * @return {} Hashmap containing the numbers that are in the same column, row or block
 */
function findNumbers(board, row, col) {
	var numbers = {};

	// Column and row
	for(var i = 0; i < 9; i++) {
		// same column
		if(board[i][col] != 0) numbers[ board[i][col] ] = 1;
		// same row
		if(board[row][i] != 0) numbers[ board[row][i] ] = 1; 
	}

	// Get begining block
	var bRow = parseInt(row/3) * 3;
	var bCol = parseInt(col/3) * 3;

	//console.log(bRow, bCol);

	// Block
	for(i = bRow; i < bRow + 3; i++) {
		if(i == row) continue;
		for(var j = bCol; j < bCol + 3; j++) {
			if(j == col) continue;
			if(board[i][j] != 0) numbers[ board[i][j] ] = 1;
		}
	}

	return numbers;
};

function checkSolution(board, solution) {
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {
			// If one position is wrong, return false
			if(board[i][j] != solution[i][j]) return false;
		}
	}

	return true;
}

solveSudoku(sudoku);

if(checkSolution(sudoku, solution)) {
	console.log("Solved");
} else {
	console.log("Error");
}
