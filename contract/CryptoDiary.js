class CryptoDiary {
    constructor() {
        // define fields stored to state trie.
        LocalContractStorage.defineProperties(this, {
            userCount: 0,
            diaryCount: 0
        });
        // userIndex (from 0) -> user's address
        LocalContractStorage.defineMapProperty(this, "userIndex");
        // user -> the number of his diaries
        LocalContractStorage.defineMapProperty(this, "users");
        // diaryId -> {timestamp, diaryContent}
        LocalContractStorage.defineMapProperty(this, "diaries");
        // diaryIndex (from 0) -> diaryId
        LocalContractStorage.defineMapProperty(this, "diaryIndex");
    }

    // init function.
    init( ) {
        var creator = Blockchain.transaction.from;
        var timestamp = Date.parse(new Date());
        var content = "This is the first Diary";

        var diary = {time: timestamp, content: content};

        var diaryId = creator + "0";

        this.userCount = 1;
        this.diaryCount = 1;
        this.diaryIndex.set(0, diaryId);
        this.userIndex.set(0, creator);
        this.users.set(creator, 1);
        this.diaries.set(diaryId, diary);
    }

    // add new diary
    addDiary(newContent,isEncrypted){
        var timestamp = Date.parse(new Date());

        if (!isEncrypted){
            isEncrypted = false;
        } else if(isEncrypted.toLowerCase() == "true"){
            isEncrypted = true;
        }else{
            isEncrypted = false;
        }

        var newDiary = {time: timestamp, content:newContent, en: isEncrypted};
        var sender = Blockchain.transaction.from;

        var preCountofDiary = this.users.get(sender);
        var diaryId = "";

        if(!preCountofDiary){
            // this is his first;
            var userIndex = this.userCount;
            this.userCount = this.userCount + 1;
            this.userIndex.set(userIndex, sender);

            this.users.set(sender, 1);
            diaryId = sender + "0";
            this.diaries.set(diaryId, newDiary);
        }else{
            diaryId = sender + preCountofDiary.toString();
            this.users.set(sender, preCountofDiary + 1);
            this.diaries.set(diaryId, newDiary);
        }
        this.diaryIndex.set(this.diaryCount, diaryId);
        this.diaryCount = this.diaryCount+1;
    }

    // get all users' addresses
    getAllUsers(){
        var res = [];
        for (var i = 0; i< this.userCount; i++){
            res.push(this.userIndex.get(i));
        }
        return res;
    }

    // get diaries by the writer's address
    getByWriter(writer){
        var res = [];
        var diaryCount = this.users.get(writer);
        if(!diaryCount){
            return res;
        }
        for (var i = 0; i< diaryCount; i++){
            var diaryId = writer + i;
            res.push(this.diaries.get(diaryId));
        }

        return res;
    }

    // get diaries which are belong to the sender
    getSelf(){
        return this.getByWriter(Blockchain.transaction.from);
    }

    // get diaries by a range of index (start > end, the order of diary indexes is inverted)
    getDiaryByIndex(start, end){
        var res = [];
        if (start >= this.diaryCount){
            start = this.diaryCount-1;
        }
        if (end <0){
            end = 0;
        }
        for (var i = start; i>= end; i--){
            var diaryId = this.diaryIndex.get(i);
            var writerAddress = diaryId.substr(0,35);
            var diary = this.diaries.get(diaryId);
            res.push({writer:writerAddress,diary:diary})
        }
        return res;
    }

    getTheLast20Diary(){
        var start = this.diaryCount-1;
        var end = start -19;
        if (end <0){
            end = 0;
        }
        var res = [];
        for (var i = start; i>= end; i--){
            var diaryId = this.diaryIndex.get(i);
            var writerAddress = diaryId.substr(0,35);
            var diary = this.diaries.get(diaryId);
            res.push({writer:writerAddress,diary:diary})
        }
        return res;
    }

    getUserDiaryCount(address){
        return this.users.get(address);
    }

    getUserCount(){
        return this.userCount;
    }

    getDiaryCount(){
        return this.diaryCount;
    }

}

module.exports = CryptoDiary;