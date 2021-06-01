#include <stdint.h>
#include <iostream>

using namespace std;

// https://en.wikipedia.org/wiki/Xorshift

struct xor_state {
    uint64_t x;
};

uint64_t xor_shift_64(xor_state& state) {
    uint64_t x = state.x;
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    state.x = x;
    return x;
}

int main()
{
    struct xor_state state;

    state.x = 1;

    int i;
    int a = 20;

    for (i = 0; i < a; i++) {
        cout<<""<<xor_shift_64(state);
        cout<<"\n";
    }

    return 0;
}
