#include <stdint.h>
#include <iostream>

using namespace std;

// https://en.wikipedia.org/wiki/Xorshift

struct xor_state {
    uint32_t x, a, b, c;
};

uint32_t xor_shift_32(xor_state& state) {
    uint32_t x = state.x;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    state.x = x;
    return x;
}

int main()
{
    struct xor_state state;

    state.x = 1;
    state.a = 13;
    state.b = 17;
    state.c = 5;

    int i;
    int a = 10;

    for (i = 0; i < a; i++) {
        cout<<""<<xor_shift_32(state);
        cout<<"\n";
    }

    return 0;
}
