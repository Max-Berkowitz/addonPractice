#include "explainReturnValue.h"
#include <string>

using namespace explainReturnValue;

std::string addAString::explain(int num)
{
    return "This is your sum: " + std::to_string(num);
}