var sudoku = "";
var sudoArray = [];
var result;
var points = [];
var flag = 0;
var count = 0;


function sudoGrid() {
    for (var i = 1; i <= 9; i++) {
        var colomn = "";
        for (var j = 1; j <= 9; j++) {
            let cid = `${i}` + `${j}`;
            colomn += `<div class="col p-2 " ><input id="${cid}" class="p-0 m-0 w-100 " type="text" maxlength="1" placeholder="0" style="text-align:center;font-weight:bold;"></div>`;
        }
        var row = `<div class="row">${colomn} </div>`;
        sudoku += row;
    }

}

function display() {
    // $('refresh').hide();

    sudoGrid();
    document.getElementById('box').innerHTML = sudoku;
    document.getElementById('solveBtn').style.display='block';
    document.getElementById('refresh').style.display='none';
}

function assignValues(){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
            let cid = `${i+1}` + `${j+1}`;
			document.getElementById(cid).value = sudoArray[i][j];
		}
	}
}
function row(a){
	var vector= [0,0,0,0,0,0,0,0,0,0];
	for(var i=0;i<9;i++){
		var x= sudoArray[a][i];
		if(x==''){
			continue;
		}
		else if( vector[x]==1){
			return false;
		}
		else {
			vector[x]=1;
		}
	}
	return true;
}
function col(b){
	var vector = [0,0,0,0,0,0,0,0,0,0];
	for(var i=0;i<9;i++){
		var x= sudoArray[i][b];
		if(x==''){
			continue;
		}
		else if(vector[x]==1){
			return false;
		}
		else {
			vector[x]=1;
		}
	}
	return true;
}
function boxEle(a, b) {
	var vector = [0,0,0,0,0,0,0,0,0,0];

    for (var i = a - a % 3; i < a - a % 3 + 3; i++) {
        for (var j = b - b % 3; j < b - b % 3 + 3; j++) {
        	var x= sudoArray[i][j];
            if (x=='') {
                continue;
            }
            else if(vector[x]==1){
            	return false ;
            }
            else {
            	vector[x]=1;
            }
        }
    }
    return true;
}
function isValid(){
	for(var i=0;i<9;i++){

		for(var j=0; j<9;j++){
			if(sudoArray[i][j]=='' || (sudoArray[i][j]<='9' && sudoArray[i][j]>='1') ){
				continue;
			}
			else {
				return false;
			}
		}
	}
	for(var i=0;i<9;i++){		
		if(row(i)){
			for(var j=0;j<9;j++){
				if(col(j) && boxEle(i,j)){
					continue;
				}
				else {
					return false;
				}
			}
		}
		else {
				return false;
		}		
	}
	return true;
}
function mainFun(emptyCount) {
    if (flag == 1 || emptyCount >= points.length) {
        return;
    }
    // console.log(sudoArray);
    var x = points[emptyCount][0];
    var y = points[emptyCount][1];
    for (var i = 1; i <= 9; i++) {
        sudoArray[x][y] = i;
        // console.log(i);
        assignValues();

        if (col(y) && row(x) && boxEle(x,y)) {
            mainFun(emptyCount + 1);
            if (emptyCount == points.length - 1 && flag==0) {
                flag = 1;
                assignValues();
                // display();
                result= sudoArray;
                // console.log(sudoArray);
                return ;
            }
        }
        if(flag==1)return;
        count++;
        sudoArray[x][y] = '';
    }
    return;
}


function readInput() {
    sudoArray = [];
    points = [];
    flag = 0;
    for (var i = 1; i <= 9; i++) {
        let temp = [];
        for (var j = 1; j <= 9; j++) {
            let cid = `${i}` + `${j}`;
            let cell = document.getElementById(cid).value;
            if(cell==''){
	            points.push([i - 1, j - 1]);

            }
            temp.push(cell);
        }
        sudoArray.push(temp);
    }
    if(!isValid()){
	    document.getElementById('alert').innerText='Invalid sudoku';
	    document.getElementById('alert').style.display='block';
	    document.getElementById('solveBtn').style.display='none';
	    document.getElementById('refresh').style.display='block';

    }
    else{
	    mainFun(0);
	    document.getElementById('alert').style.display='block';
	    document.getElementById('solveBtn').style.display='none';
	    document.getElementById('refresh').style.display='block';


    }

    // console.log(count);
    // display();
    // assignNewValues();
    // console.log(sudoArray);

}
// console.log(sudoArray);
// console.log('yessss');