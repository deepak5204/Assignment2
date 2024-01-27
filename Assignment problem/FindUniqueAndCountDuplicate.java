import java.util.HashSet;
import java.util.Set;

public class FindUniqueAndCountDuplicate {
    public static int findUniqueAndcountDuplicate(int[] arr){
        Set<Integer> s = new HashSet<>();

        for(int i = 0; i < arr.length; i++){
            s.add(arr[i]);
        }
        System.out.println("unique numbers are "+ s);
        return arr.length - s.size();
    }
    
    public static void main(String[] args){
        int[] arr = {3, 4, 5, 5, 5, 7, 8, 9};
        System.out.println("duplicate count : " + findUniqueAndcountDuplicate(arr));
     
    }
}
