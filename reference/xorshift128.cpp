#include <stdint.h>
#include <iostream>

using namespace std;

// https://en.wikipedia.org/wiki/Xorshift
// Xorshift RNGs - George Marsaglia

struct xor_state {
    uint32_t x, y, z, w;
};

// d === x;
// c === y;
// b === z;
// a === w;

uint32_t xor_shift_128(xor_state& state) {
	uint32_t t = state.x;
	uint32_t w = state.w;
    t ^= t << 11;
    t ^= t >> 8;
    w ^= w >> 19;

    state.x = state.y;
    state.y = state.z;
    state.z = state.w;

    return (state.w = w ^ t);

//    uint32_t t = state->d;
//	uint32_t const s = state->a;
//	state->d = state->c;
//	state->c = state->b;
//	state->b = s;
//
//	return state->a = t ^ s ^ (s >> 19);
}

int main()
{
    struct xor_state state;

    state.x = 123456789;
    state.y = 362436069;
    state.z = 521288629;
    state.w = 88675123;

    int i;
    int a = 10;

    for (i = 0; i < a; i++) {
        cout<<""<<xor_shift_128(state);
        cout<<"\n";
    }

    return 0;
}
