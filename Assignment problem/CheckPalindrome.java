public class CheckPalindrome{
    public static boolean checkPalindrome(int num){
        int temp = num;
        int sum = 0;
        while(temp > 0){
            int r = temp % 10;
            sum = sum * 10 + r;
            temp = temp / 10;
        }
       if(sum == num){
            return true;
        }
        return false;
    }
    public static void main(String[] args) {
        int num = 101;
        System.out.println(checkPalindrome(num));
    }
}