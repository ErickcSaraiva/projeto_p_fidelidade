import 'package:dio/dio.dart';
import '../config.dart';

class ApiService {
  final Dio dio;

  /// If [baseUrl] is not provided, uses `API_BASE` from `lib/config.dart`.
  ApiService({String? baseUrl}) : dio = Dio(BaseOptions(baseUrl: baseUrl ?? API_BASE));

  Future<int> getBalance(String userId) async {
    final res = await dio.get('/balance/$userId');
    return res.data['balance'] as int;
  }

  Future<Map<String, dynamic>> transfer(String userId, int amount, String machineId) async {
    final res = await dio.post('/transfer', data: {
      'user_id': userId,
      'amount': amount,
      'machine_id': machineId,
    });
    return Map<String, dynamic>.from(res.data);
  }
}
