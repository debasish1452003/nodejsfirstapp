const gfName = "MrsRandom";
const gfName1 = "MrsRandom1";
const gfName2 = "MrsRandom2";


// module.exports = gfName;
export default gfName;
export{gfName1, gfName2};


export const generateLoveParcent = () =>{
    return `${Math.random()*100}%`;
}