#include <stdint.h>
#include <iostream>

using namespace std;

struct xor_state {
    uint64_t x, y;
};

uint64_t next(xor_state& state) {
    uint64_t s1 = state.x;
    const uint64_t s0 = state.y;
    const uint64_t result = s0 + s1;
    state.x = s0;
    s1 ^= s1 << 23; // a
    state.y = s1 ^ s0 ^ (s1 >> 18) ^ (s0 >> 5); // b, c
    return result;
}



int main()
{
    struct xor_state state;

    state.x = 123456789;
    state.y = 362436069;

    int i;
    int a = 20;

    for (i = 0; i < a; i++) {
        cout<<""<<next(state);
        cout<<",\n";
    }

    return 0;
}
