export default function Michigan() {
    return (
        <form>
        Are you from Michigan?
        <div>
            <input type="radio" id="yes" name="answer" value="D"/>
            <label className="option" htmlFor="yes">Yes</label>
        </div>
        <div>
            <input type="radio" id="no" name="answer" value="D"/>
            <label className="option" htmlFor="no">No</label>
        </div>
        </form>
    );
};